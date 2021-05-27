pragma solidity 0.6.12;


// SPDX-License-Identifier: MIT
interface IValueLiquidFormula {
    function getAmountsOut(
        address tokenIn,
        address tokenOut,
        uint amountIn,
        address[] calldata path
    ) external view returns (uint[] memory amounts);
}