// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

interface IHarvestInfo {
    function pending(address _strategy) external view returns (uint256);

    function pendingDollarValue(address _strategy) external view returns (uint256);
}
