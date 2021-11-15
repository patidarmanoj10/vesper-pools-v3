// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "./Crv4PoolStrategySUSDPool.sol";

//solhint-disable no-empty-blocks
contract Crv4PoolStrategySUSDPoolDAI is Crv4PoolStrategySUSDPool {
    string public constant NAME = "Curve-4pool-SUSD-DAI-Strategy";
    string public constant VERSION = "3.0.15";

    // collateralIdx for DAI is 0
    constructor(address _pool, address _swapManager) Crv4PoolStrategySUSDPool(_pool, _swapManager, 0) {}

    /// @dev Convert from 18 decimals to token defined decimals. Default no conversion.
    function convertFrom18(uint256 amount) public pure override returns (uint256) {
        return amount;
    }
}
