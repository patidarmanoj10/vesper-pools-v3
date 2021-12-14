// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "./CompoundXYStrategy.sol";

// solhint-disable no-empty-blocks
/// @title Deposit ETH/WETH in Compound and earn interest.
contract CompoundXYStrategyETH is CompoundXYStrategy {
    string public constant NAME = "CompoundXYStrategyETH";
    string public constant VERSION = "3.0.22";

    constructor(
        address _pool,
        address _swapManager,
        address _receiptToken,
        address _borrowCToken
    ) CompoundXYStrategy(_pool, _swapManager, _receiptToken, _borrowCToken) {}

    /// @dev Only receive ETH from either cToken or WETH
    receive() external payable {
        require(msg.sender == address(supplyCToken) || msg.sender == WETH, "not-allowed-to-send-ether");
    }

    /// @dev Unwrap ETH and supply in Compound
    function _mintX(uint256 _amount) internal override {
        if (_amount != 0) {
            TokenLike(WETH).withdraw(_amount);
            supplyCToken.mint{value: _amount}();
        }
    }

    /// @dev Withdraw ETH from Compound and Wrap those as WETH
    function _redeemX(uint256 _amount) internal override {
        super._redeemX(_amount);
        TokenLike(WETH).deposit{value: address(this).balance}();
    }
}
