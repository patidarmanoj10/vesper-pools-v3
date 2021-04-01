// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

// TODO revisit this, just ported over from v2 to v3
interface IStrategy {
    function rebalance() external;

    function deposit(uint256 amount) external;

    function beforeWithdraw() external;

    function withdraw(uint256 amount) external;

    function withdrawAll() external;

    function isUpgradable() external view returns (bool);

    function isReservedToken(address _token) external view returns (bool);

    function token() external view returns (address);

    function pool() external view returns (address);

    function totalLocked() external view returns (uint256);

    function earn() external;

    //Lifecycle functions
    function pause() external;

    function unpause() external;
}
