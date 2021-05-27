pragma solidity 0.6.12;


// SPDX-License-Identifier: MIT
interface IVPegSwap {
    function addLiquidity(
        address pool,
        address basePool,
        uint256[] memory meta_amounts,
        uint256[] memory base_amounts,
        uint256 minToMint,
        uint256 deadline
    ) external returns (uint256);
}