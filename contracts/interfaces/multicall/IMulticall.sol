// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

interface IMulticall {
    struct Call {
        address target;
        bytes callData;
    }

    function aggregate(Call[] memory calls) external returns (uint256 blockNumber, bytes[] memory returnData);
}
