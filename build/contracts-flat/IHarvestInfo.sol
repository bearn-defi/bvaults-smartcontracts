pragma solidity 0.6.12;


// SPDX-License-Identifier: MIT
interface IHarvestInfo {
    function pending(address _strategy) external view returns (uint256);

    function pendingDollarValue(address _strategy) external view returns (uint256);
}