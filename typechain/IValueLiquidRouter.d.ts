/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IValueLiquidRouterInterface extends ethers.utils.Interface {
  functions: {
    "addLiquidity(address,address,address,uint256,uint256,uint256,uint256,address,uint256)": FunctionFragment;
    "swapExactTokensForTokens(address,address,uint256,uint256,address[],address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addLiquidity",
    values: [
      string,
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactTokensForTokens",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      string[],
      string,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "addLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapExactTokensForTokens",
    data: BytesLike
  ): Result;

  events: {};
}

export class IValueLiquidRouter extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IValueLiquidRouterInterface;

  functions: {
    addLiquidity(
      pair: string,
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "addLiquidity(address,address,address,uint256,uint256,uint256,uint256,address,uint256)"(
      pair: string,
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    swapExactTokensForTokens(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "swapExactTokensForTokens(address,address,uint256,uint256,address[],address,uint256)"(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  addLiquidity(
    pair: string,
    tokenA: string,
    tokenB: string,
    amountADesired: BigNumberish,
    amountBDesired: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "addLiquidity(address,address,address,uint256,uint256,uint256,uint256,address,uint256)"(
    pair: string,
    tokenA: string,
    tokenB: string,
    amountADesired: BigNumberish,
    amountBDesired: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  swapExactTokensForTokens(
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "swapExactTokensForTokens(address,address,uint256,uint256,address[],address,uint256)"(
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    addLiquidity(
      pair: string,
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      amountA: BigNumber;
      amountB: BigNumber;
      liquidity: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
    }>;

    "addLiquidity(address,address,address,uint256,uint256,uint256,uint256,address,uint256)"(
      pair: string,
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      amountA: BigNumber;
      amountB: BigNumber;
      liquidity: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
    }>;

    swapExactTokensForTokens(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "swapExactTokensForTokens(address,address,uint256,uint256,address[],address,uint256)"(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;
  };

  filters: {};

  estimateGas: {
    addLiquidity(
      pair: string,
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "addLiquidity(address,address,address,uint256,uint256,uint256,uint256,address,uint256)"(
      pair: string,
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    swapExactTokensForTokens(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "swapExactTokensForTokens(address,address,uint256,uint256,address[],address,uint256)"(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addLiquidity(
      pair: string,
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "addLiquidity(address,address,address,uint256,uint256,uint256,uint256,address,uint256)"(
      pair: string,
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    swapExactTokensForTokens(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "swapExactTokensForTokens(address,address,uint256,uint256,address[],address,uint256)"(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}