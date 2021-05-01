// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "./AaveStrategy.sol";

//solhint-disable no-empty-blocks
contract AaveStrategyDAI is AaveStrategy {
    string public constant NAME = "Aave-Strategy-DAI";
    string public constant VERSION = "3.0.0";

    constructor(address _pool)
        AaveStrategy(_pool, 0x028171bCA77440897B824Ca71D1c56caC55b68A3) //aDAI
    {}
}
