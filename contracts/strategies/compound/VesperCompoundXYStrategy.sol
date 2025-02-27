// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "./CompoundXYStrategy.sol";
import "../../interfaces/vesper/IVesperPool.sol";

// solhint-disable no-empty-blocks
/// @title Deposit Collateral in Compound and earn interest by depositing borrowed token in a Vesper Pool.
contract VesperCompoundXYStrategy is CompoundXYStrategy {
    using SafeERC20 for IERC20;

    // Destination Grow Pool for borrowed Token
    address public immutable vPool;
    address internal constant VSP = 0x1b40183EFB4Dd766f11bDa7A7c3AD8982e998421;

    constructor(
        address _pool,
        address _swapManager,
        address _comptroller,
        address _rewardDistributor,
        address _rewardToken,
        address _receiptToken,
        address _borrowCToken,
        address _vPool,
        string memory _name
    )
        CompoundXYStrategy(
            _pool,
            _swapManager,
            _comptroller,
            _rewardDistributor,
            _rewardToken,
            _receiptToken,
            _borrowCToken,
            _name
        )
    {
        require(address(IVesperPool(_vPool).token()) == borrowToken, "not-a-valid-dai-pool");
        vPool = _vPool;
    }

    function updateBorrowCToken(address _newBorrowCToken) external override onlyGovernor {}

    /// @notice Gets amount of borrowed Y collateral in strategy + Y collateral amount deposited in vPool
    function borrowBalance() external view returns (uint256) {
        return _getBorrowBalance();
    }

    function _approveToken(uint256 _amount) internal override {
        super._approveToken(_amount);
        IERC20(borrowToken).safeApprove(vPool, _amount);
        for (uint256 i = 0; i < swapManager.N_DEX(); i++) {
            IERC20(VSP).safeApprove(address(swapManager.ROUTERS(i)), _amount);
        }
    }

    /// @notice Withdraw _shares proportional to collateral _amount from vPool
    function _withdrawFromVesperPool(uint256 _amount) internal {
        uint256 _pricePerShare = IVesperPool(vPool).pricePerShare();
        uint256 _shares = (_amount * 1e18) / _pricePerShare;
        _shares = _amount > ((_shares * _pricePerShare) / 1e18) ? _shares + 1 : _shares;

        uint256 _maxShares = IERC20(vPool).balanceOf(address(this));

        IVesperPool(vPool).whitelistedWithdraw(_shares > _maxShares ? _maxShares : _shares);
    }

    /// @notice After borrowing Y, deposit to Vesper Pool
    function _afterBorrowY(uint256 _amount) internal override {
        IVesperPool(vPool).deposit(_amount);
    }

    /// @notice Before repaying Y, withdraw it from Vesper Pool
    function _beforeRepayY(uint256 _amount) internal override {
        _withdrawFromVesperPool(_amount);
    }

    /// @notice Borrowed Y balance deposited in Vesper Pool
    function _getBorrowBalance() internal view override returns (uint256) {
        return
            IERC20(borrowToken).balanceOf(address(this)) +
            ((IVesperPool(vPool).pricePerShare() * IVesperPool(vPool).balanceOf(address(this))) / 1e18);
    }

    function _rebalanceBorrow(uint256 _excessBorrow) internal override {
        if (_excessBorrow != 0) {
            uint256 _borrowedHereBefore = IERC20(borrowToken).balanceOf(address(this));
            _withdrawFromVesperPool(_excessBorrow);
            uint256 _borrowedHere = IERC20(borrowToken).balanceOf(address(this)) - _borrowedHereBefore;
            if (_borrowedHere != 0) {
                _safeSwap(borrowToken, address(collateralToken), _borrowedHere, 1);
            }
        }
    }

    function _claimRewardsAndConvertTo(address _toToken) internal override {
        super._claimRewardsAndConvertTo(_toToken);
        uint256 _vspAmount = IERC20(VSP).balanceOf(address(this));
        if (_vspAmount > 0) {
            _safeSwap(VSP, _toToken, _vspAmount, 1);
        }
    }
}
