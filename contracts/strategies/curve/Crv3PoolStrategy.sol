// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../../interfaces/vesper/IVesperPool.sol";
import "../Strategy.sol";
import "./Crv3PoolMgr.sol";

/// @title This strategy will deposit collateral token in Curve 3Pool and earn interest.
abstract contract Crv3PoolStrategy is Crv3PoolMgr, Strategy {
    using SafeERC20 for IERC20;

    mapping(address => bool) private reservedToken;
    address[] private oracles;

    uint256 public constant ORACLE_PERIOD = 3600; // 1h
    uint256 public constant ORACLE_ROUTER = 0; // Uniswap V2
    uint256 public immutable collIdx;
    uint256 public usdRate;
    uint256 public usdRateTimestamp;
    bool public depositError;

    uint256 public swapSlippage = 100; // 10000 is 100%; 100 is 1%
    uint256 public crvSlippage = 10; // 10000 is 100%; 10 is 0.1%

    event UpdatedSlippage(
        uint256 oldSwapSlippage,
        uint256 newSwapSlippage,
        uint256 oldCrvSlippage,
        uint256 newCrvSlippage
    );
    event DepositFailed(string reason);

    constructor(
        address _pool,
        address _swapManager,
        uint256 _collateralIdx
    ) Strategy(_pool, _swapManager, THREECRV) Crv3PoolMgr() {
        require(_collateralIdx < COINS.length, "Invalid collateral for 3Pool");
        require(COIN_ADDRS[_collateralIdx] == address(IVesperPool(_pool).token()), "Collateral does not match");
        reservedToken[THREECRV] = true;
        reservedToken[CRV] = true;
        collIdx = _collateralIdx;
        _setupOracles();
    }

    function updateSlippage(uint256 _newSwapSlippage, uint256 _newCrvSlippage) external onlyGovernor {
        require(_newSwapSlippage < 10000 && _newCrvSlippage < 10000, "invalid-slippage-value");
        emit UpdatedSlippage(swapSlippage, _newSwapSlippage, crvSlippage, _newCrvSlippage);
        swapSlippage = _newSwapSlippage;
        crvSlippage - _newCrvSlippage;
    }

    /// @dev Check whether given token is reserved or not. Reserved tokens are not allowed to sweep.
    function isReservedToken(address _token) public view override returns (bool) {
        return reservedToken[_token];
    }

    /**
     * @notice Calculate total value of asset under management
     * @dev Report total value in collateral token
     */
    function totalValue() external view override returns (uint256 _value) {
        _value =
            collateralToken.balanceOf(address(this)) +
            convertFrom18(_calcAmtOutAfterSlippage(getLpValue(totalLp()), crvSlippage));
    }

    function _setupOracles() internal override {
        oracles.push(swapManager.createOrUpdateOracle(CRV, WETH, ORACLE_PERIOD, ORACLE_ROUTER));
        for (uint256 i = 0; i < N; i++) {
            oracles.push(swapManager.createOrUpdateOracle(COIN_ADDRS[i], WETH, ORACLE_PERIOD, ORACLE_ROUTER));
        }
    }

    function _calcAmtOutAfterSlippage(uint256 _amount, uint256 _slippage) internal pure returns (uint256) {
        return (_amount * (10000 - _slippage)) / (10000);
    }

    function _consultOracle(
        address _from,
        address _to,
        uint256 _amt
    ) internal returns (uint256, bool) {
        // from, to, amountIn, period, router
        (uint256 rate, uint256 lastUpdate, ) = swapManager.consult(_from, _to, _amt, ORACLE_PERIOD, ORACLE_ROUTER);
        // We're looking at a TWAP ORACLE with a 1 hr Period that has been updated within the last hour
        if ((lastUpdate > (block.timestamp - ORACLE_PERIOD)) && (rate != 0)) return (rate, true);
        return (0, false);
    }

    // given the rates of 3 stablecoins compared with a common denominator
    // return the lowest divided by the highest
    function _getSafeUsdRate() internal returns (uint256) {
        // use a stored rate if we've looked it up recently
        if (usdRateTimestamp > block.timestamp - ORACLE_PERIOD && usdRate != 0) return usdRate;
        // otherwise, calculate a rate and store it.
        uint256 lowest;
        uint256 highest;
        for (uint256 i = 0; i < N; i++) {
            // get the rate for $1
            (uint256 rate, bool isValid) = _consultOracle(COIN_ADDRS[i], WETH, 10**DECIMALS[i]);
            if (isValid) {
                if (lowest == 0 || rate < lowest) {
                    lowest = rate;
                }
                if (highest < rate) {
                    highest = rate;
                }
            }
        }
        // We only need to check one of them because if a single valid rate is returned,
        // highest == lowest and highest > 0 && lowest > 0
        require(lowest != 0, "no-oracle-rates");
        usdRateTimestamp = block.timestamp;
        usdRate = (lowest * 1e18) / highest;
        return usdRate;
    }

    function _approveToken(uint256 _amount) internal override {
        collateralToken.safeApprove(pool, _amount);
        collateralToken.safeApprove(crvPool, _amount);
        for (uint256 i = 0; i < swapManager.N_DEX(); i++) {
            IERC20(CRV).safeApprove(address(swapManager.ROUTERS(i)), _amount);
        }
        IERC20(crvLp).safeApprove(crvGauge, _amount);
    }

    function _reinvest() internal override {
        depositError = false;
        uint256 amt = collateralToken.balanceOf(address(this));
        depositError = !_depositToCurve(amt);
        _stakeAllLpToGauge();
    }

    function _depositToCurve(uint256 amt) internal returns (bool) {
        if (amt != 0) {
            uint256[3] memory depositAmounts;
            depositAmounts[collIdx] = amt;
            uint256 expectedOut =
                _calcAmtOutAfterSlippage(THREEPOOL.calc_token_amount(depositAmounts, true), crvSlippage);
            uint256 minLpAmount =
                ((amt * _getSafeUsdRate()) / THREEPOOL.get_virtual_price()) * 10**(18 - DECIMALS[collIdx]);
            if (expectedOut > minLpAmount) minLpAmount = expectedOut;
            // solhint-disable-next-line no-empty-blocks
            try THREEPOOL.add_liquidity(depositAmounts, minLpAmount) {} catch Error(string memory reason) {
                emit DepositFailed(reason);
                return false;
            }
        }
        return true;
    }

    function _withdraw(uint256 _amount) internal override {
        // This adds some gas but will save loss on exchange fees
        uint256 balanceHere = collateralToken.balanceOf(address(this));
        if (_amount > balanceHere) {
            _unstakeAndWithdrawAsCollateral(_amount - balanceHere);
        }
        collateralToken.safeTransfer(pool, _amount);
    }

    function _unstakeAndWithdrawAsCollateral(uint256 _amount) internal returns (uint256 toWithdraw) {
        if (_amount == 0) return 0;
        uint256 i = collIdx;
        (uint256 lpToWithdraw, uint256 unstakeAmt) = calcWithdrawLpAs(_amount, i);
        _unstakeLpFromGauge(unstakeAmt);
        uint256 minAmtOut =
            convertFrom18(
                (lpToWithdraw * _calcAmtOutAfterSlippage(_minimumLpPrice(_getSafeUsdRate()), crvSlippage)) / 1e18
            );
        _withdrawAsFromCrvPool(lpToWithdraw, minAmtOut, i);
        toWithdraw = collateralToken.balanceOf(address(this));
        if (toWithdraw > _amount) toWithdraw = _amount;
    }

    /**
     * @notice some strategy may want to prepare before doing migration. 
        Example In Maker old strategy want to give vault ownership to new strategy
     */
    function _beforeMigration(
        address /*_newStrategy*/
    ) internal override {
        _unstakeAllLpFromGauge();
    }

    function _claimRewardsAndConvertTo(address _toToken) internal override {
        _claimCrv();
        uint256 amt = IERC20(CRV).balanceOf(address(this));
        if (amt != 0) {
            (uint256 minWethOut, bool isValid) = _consultOracle(CRV, WETH, amt);
            (uint256 minAmtOut, bool isValidTwo) = _consultOracle(WETH, address(collateralToken), minWethOut);
            require(isValid, "stale-crv-oracle");
            require(isValidTwo, "stale-collateral-oracle");
            _safeSwap(CRV, _toToken, amt, _calcAmtOutAfterSlippage(minAmtOut, swapSlippage));
        }
    }

    /**
     * @notice Withdraw collateral to payback excess debt in pool.
     * @param _excessDebt Excess debt of strategy in collateral token
     * @param _extra additional amount to unstake and withdraw, in collateral token
     * @return _payback amount in collateral token. Usually it is equal to excess debt.
     */
    function _liquidate(uint256 _excessDebt, uint256 _extra) internal returns (uint256 _payback) {
        _payback = _unstakeAndWithdrawAsCollateral(_excessDebt + _extra);
        // we dont want to return a value greater than we need to
        if (_payback > _excessDebt) _payback = _excessDebt;
    }

    function _realizeLoss(uint256 _totalDebt) internal view override returns (uint256 _loss) {
        uint256 _collateralBalance = convertFrom18(_calcAmtOutAfterSlippage(getLpValue(totalLp()), crvSlippage));
        if (_collateralBalance < _totalDebt) {
            _loss = _totalDebt - _collateralBalance;
        }
    }

    function _realizeGross(uint256 _totalDebt)
        internal
        returns (
            uint256 _profit,
            uint256 _loss,
            uint256 _toUnstake
        )
    {
        uint256 baseline = collateralToken.balanceOf(address(this));
        _claimRewardsAndConvertTo(address(collateralToken));
        uint256 newBalance = collateralToken.balanceOf(address(this));
        _profit = newBalance - baseline;

        uint256 _collateralBalance =
            baseline + convertFrom18(_calcAmtOutAfterSlippage(getLpValue(totalLp()), crvSlippage));
        if (_collateralBalance > _totalDebt) {
            _profit += _collateralBalance - _totalDebt;
        } else {
            _loss = _totalDebt - _collateralBalance;
        }

        if (_profit > _loss) {
            _profit = _profit - _loss;
            _loss = 0;
            if (_profit > newBalance) _toUnstake = _profit - newBalance;
        } else {
            _loss = _loss - _profit;
            _profit = 0;
        }
    }

    function _generateReport()
        internal
        override
        returns (
            uint256 _profit,
            uint256 _loss,
            uint256 _payback
        )
    {
        uint256 _excessDebt = IVesperPool(pool).excessDebt(address(this));
        uint256 _totalDebt = IVesperPool(pool).totalDebtOf(address(this));
        uint256 _toUnstake;
        (_profit, _loss, _toUnstake) = _realizeGross(_totalDebt);
        // only make call to unstake and withdraw once
        _payback = _liquidate(_excessDebt, _toUnstake);
    }

    function rebalance() external override onlyKeeper {
        (uint256 _profit, uint256 _loss, uint256 _payback) = _generateReport();
        IVesperPool(pool).reportEarning(_profit, _loss, _payback);
        _reinvest();
        if (!depositError) {
            uint256 depositLoss = _realizeLoss(IVesperPool(pool).totalDebtOf(address(this)));
            if (depositLoss > _loss) IVesperPool(pool).reportLoss(depositLoss - _loss);
        }
    }

    // Unused
    /* solhint-disable no-empty-blocks */

    function _liquidate(uint256 _excessDebt) internal override returns (uint256 _payback) {}

    function _realizeProfit(uint256 _totalDebt) internal override returns (uint256 _profit) {}
}
