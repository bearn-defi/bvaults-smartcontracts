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

interface BvaultsHarvestInfoInterface extends ethers.utils.Interface {
  functions: {
    "executeTransaction(address,uint256,string,bytes)": FunctionFragment;
    "farmingPoolIds(address)": FunctionFragment;
    "farmingPoolTypes(address)": FunctionFragment;
    "farmingPools(address)": FunctionFragment;
    "inCaseTokensGetStuck(address,uint256,address)": FunctionFragment;
    "initialize()": FunctionFragment;
    "initialized()": FunctionFragment;
    "operator()": FunctionFragment;
    "pending(address)": FunctionFragment;
    "pendingDollarValue(address)": FunctionFragment;
    "setStrategyFarmingPoolConfig(address,address,uint256,uint256,address[])": FunctionFragment;
    "setUniRouterAddress(address)": FunctionFragment;
    "toBusdPath(address,uint256)": FunctionFragment;
    "uniExchangeRate(uint256,address[])": FunctionFragment;
    "uniRouterAddress()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "executeTransaction",
    values: [string, BigNumberish, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "farmingPoolIds",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "farmingPoolTypes",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "farmingPools",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "inCaseTokensGetStuck",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialized",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "operator", values?: undefined): string;
  encodeFunctionData(functionFragment: "pending", values: [string]): string;
  encodeFunctionData(
    functionFragment: "pendingDollarValue",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setStrategyFarmingPoolConfig",
    values: [string, string, BigNumberish, BigNumberish, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setUniRouterAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "toBusdPath",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "uniExchangeRate",
    values: [BigNumberish, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "uniRouterAddress",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "executeTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "farmingPoolIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "farmingPoolTypes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "farmingPools",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "inCaseTokensGetStuck",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "operator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pending", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingDollarValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setStrategyFarmingPoolConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setUniRouterAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "toBusdPath", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "uniExchangeRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniRouterAddress",
    data: BytesLike
  ): Result;

  events: {
    "ExecuteTransaction(address,uint256,string,bytes)": EventFragment;
    "Initialized(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ExecuteTransaction"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}

export class BvaultsHarvestInfo extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: BvaultsHarvestInfoInterface;

  functions: {
    executeTransaction(
      target: string,
      value: BigNumberish,
      signature: string,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "executeTransaction(address,uint256,string,bytes)"(
      target: string,
      value: BigNumberish,
      signature: string,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    farmingPoolIds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "farmingPoolIds(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    farmingPoolTypes(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "farmingPoolTypes(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    farmingPools(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "farmingPools(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    inCaseTokensGetStuck(
      _token: string,
      _amount: BigNumberish,
      _to: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "inCaseTokensGetStuck(address,uint256,address)"(
      _token: string,
      _amount: BigNumberish,
      _to: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    initialize(overrides?: Overrides): Promise<ContractTransaction>;

    "initialize()"(overrides?: Overrides): Promise<ContractTransaction>;

    initialized(
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "initialized()"(
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    operator(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "operator()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    pending(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<{
      _pending: BigNumber;
      0: BigNumber;
    }>;

    "pending(address)"(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<{
      _pending: BigNumber;
      0: BigNumber;
    }>;

    pendingDollarValue(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "pendingDollarValue(address)"(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    setStrategyFarmingPoolConfig(
      _strategy: string,
      _pool: string,
      _poolId: BigNumberish,
      _type: BigNumberish,
      _path: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setStrategyFarmingPoolConfig(address,address,uint256,uint256,address[])"(
      _strategy: string,
      _pool: string,
      _poolId: BigNumberish,
      _type: BigNumberish,
      _path: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setUniRouterAddress(
      _uniRouterAddress: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setUniRouterAddress(address)"(
      _uniRouterAddress: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    toBusdPath(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "toBusdPath(address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    uniExchangeRate(
      _tokenAmount: BigNumberish,
      _path: string[],
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "uniExchangeRate(uint256,address[])"(
      _tokenAmount: BigNumberish,
      _path: string[],
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    uniRouterAddress(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "uniRouterAddress()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;
  };

  executeTransaction(
    target: string,
    value: BigNumberish,
    signature: string,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "executeTransaction(address,uint256,string,bytes)"(
    target: string,
    value: BigNumberish,
    signature: string,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  farmingPoolIds(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  "farmingPoolIds(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  farmingPoolTypes(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  "farmingPoolTypes(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  farmingPools(arg0: string, overrides?: CallOverrides): Promise<string>;

  "farmingPools(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<string>;

  inCaseTokensGetStuck(
    _token: string,
    _amount: BigNumberish,
    _to: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "inCaseTokensGetStuck(address,uint256,address)"(
    _token: string,
    _amount: BigNumberish,
    _to: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  initialize(overrides?: Overrides): Promise<ContractTransaction>;

  "initialize()"(overrides?: Overrides): Promise<ContractTransaction>;

  initialized(overrides?: CallOverrides): Promise<boolean>;

  "initialized()"(overrides?: CallOverrides): Promise<boolean>;

  operator(overrides?: CallOverrides): Promise<string>;

  "operator()"(overrides?: CallOverrides): Promise<string>;

  pending(_strategy: string, overrides?: CallOverrides): Promise<BigNumber>;

  "pending(address)"(
    _strategy: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  pendingDollarValue(
    _strategy: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "pendingDollarValue(address)"(
    _strategy: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setStrategyFarmingPoolConfig(
    _strategy: string,
    _pool: string,
    _poolId: BigNumberish,
    _type: BigNumberish,
    _path: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setStrategyFarmingPoolConfig(address,address,uint256,uint256,address[])"(
    _strategy: string,
    _pool: string,
    _poolId: BigNumberish,
    _type: BigNumberish,
    _path: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setUniRouterAddress(
    _uniRouterAddress: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setUniRouterAddress(address)"(
    _uniRouterAddress: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  toBusdPath(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "toBusdPath(address,uint256)"(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  uniExchangeRate(
    _tokenAmount: BigNumberish,
    _path: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "uniExchangeRate(uint256,address[])"(
    _tokenAmount: BigNumberish,
    _path: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  uniRouterAddress(overrides?: CallOverrides): Promise<string>;

  "uniRouterAddress()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    executeTransaction(
      target: string,
      value: BigNumberish,
      signature: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "executeTransaction(address,uint256,string,bytes)"(
      target: string,
      value: BigNumberish,
      signature: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    farmingPoolIds(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "farmingPoolIds(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    farmingPoolTypes(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "farmingPoolTypes(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    farmingPools(arg0: string, overrides?: CallOverrides): Promise<string>;

    "farmingPools(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<string>;

    inCaseTokensGetStuck(
      _token: string,
      _amount: BigNumberish,
      _to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "inCaseTokensGetStuck(address,uint256,address)"(
      _token: string,
      _amount: BigNumberish,
      _to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(overrides?: CallOverrides): Promise<void>;

    "initialize()"(overrides?: CallOverrides): Promise<void>;

    initialized(overrides?: CallOverrides): Promise<boolean>;

    "initialized()"(overrides?: CallOverrides): Promise<boolean>;

    operator(overrides?: CallOverrides): Promise<string>;

    "operator()"(overrides?: CallOverrides): Promise<string>;

    pending(_strategy: string, overrides?: CallOverrides): Promise<BigNumber>;

    "pending(address)"(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingDollarValue(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingDollarValue(address)"(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setStrategyFarmingPoolConfig(
      _strategy: string,
      _pool: string,
      _poolId: BigNumberish,
      _type: BigNumberish,
      _path: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    "setStrategyFarmingPoolConfig(address,address,uint256,uint256,address[])"(
      _strategy: string,
      _pool: string,
      _poolId: BigNumberish,
      _type: BigNumberish,
      _path: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    setUniRouterAddress(
      _uniRouterAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setUniRouterAddress(address)"(
      _uniRouterAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    toBusdPath(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "toBusdPath(address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    uniExchangeRate(
      _tokenAmount: BigNumberish,
      _path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "uniExchangeRate(uint256,address[])"(
      _tokenAmount: BigNumberish,
      _path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    uniRouterAddress(overrides?: CallOverrides): Promise<string>;

    "uniRouterAddress()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    ExecuteTransaction(
      target: string | null,
      value: null,
      signature: null,
      data: null
    ): EventFilter;

    Initialized(executor: string | null, at: null): EventFilter;
  };

  estimateGas: {
    executeTransaction(
      target: string,
      value: BigNumberish,
      signature: string,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "executeTransaction(address,uint256,string,bytes)"(
      target: string,
      value: BigNumberish,
      signature: string,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    farmingPoolIds(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "farmingPoolIds(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    farmingPoolTypes(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "farmingPoolTypes(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    farmingPools(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "farmingPools(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    inCaseTokensGetStuck(
      _token: string,
      _amount: BigNumberish,
      _to: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "inCaseTokensGetStuck(address,uint256,address)"(
      _token: string,
      _amount: BigNumberish,
      _to: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    initialize(overrides?: Overrides): Promise<BigNumber>;

    "initialize()"(overrides?: Overrides): Promise<BigNumber>;

    initialized(overrides?: CallOverrides): Promise<BigNumber>;

    "initialized()"(overrides?: CallOverrides): Promise<BigNumber>;

    operator(overrides?: CallOverrides): Promise<BigNumber>;

    "operator()"(overrides?: CallOverrides): Promise<BigNumber>;

    pending(_strategy: string, overrides?: CallOverrides): Promise<BigNumber>;

    "pending(address)"(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingDollarValue(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingDollarValue(address)"(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setStrategyFarmingPoolConfig(
      _strategy: string,
      _pool: string,
      _poolId: BigNumberish,
      _type: BigNumberish,
      _path: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setStrategyFarmingPoolConfig(address,address,uint256,uint256,address[])"(
      _strategy: string,
      _pool: string,
      _poolId: BigNumberish,
      _type: BigNumberish,
      _path: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    setUniRouterAddress(
      _uniRouterAddress: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setUniRouterAddress(address)"(
      _uniRouterAddress: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    toBusdPath(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "toBusdPath(address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    uniExchangeRate(
      _tokenAmount: BigNumberish,
      _path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "uniExchangeRate(uint256,address[])"(
      _tokenAmount: BigNumberish,
      _path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    uniRouterAddress(overrides?: CallOverrides): Promise<BigNumber>;

    "uniRouterAddress()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    executeTransaction(
      target: string,
      value: BigNumberish,
      signature: string,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "executeTransaction(address,uint256,string,bytes)"(
      target: string,
      value: BigNumberish,
      signature: string,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    farmingPoolIds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "farmingPoolIds(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    farmingPoolTypes(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "farmingPoolTypes(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    farmingPools(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "farmingPools(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    inCaseTokensGetStuck(
      _token: string,
      _amount: BigNumberish,
      _to: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "inCaseTokensGetStuck(address,uint256,address)"(
      _token: string,
      _amount: BigNumberish,
      _to: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    initialize(overrides?: Overrides): Promise<PopulatedTransaction>;

    "initialize()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    initialized(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "initialized()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    operator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "operator()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pending(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "pending(address)"(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingDollarValue(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "pendingDollarValue(address)"(
      _strategy: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setStrategyFarmingPoolConfig(
      _strategy: string,
      _pool: string,
      _poolId: BigNumberish,
      _type: BigNumberish,
      _path: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setStrategyFarmingPoolConfig(address,address,uint256,uint256,address[])"(
      _strategy: string,
      _pool: string,
      _poolId: BigNumberish,
      _type: BigNumberish,
      _path: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setUniRouterAddress(
      _uniRouterAddress: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setUniRouterAddress(address)"(
      _uniRouterAddress: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    toBusdPath(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "toBusdPath(address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    uniExchangeRate(
      _tokenAmount: BigNumberish,
      _path: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "uniExchangeRate(uint256,address[])"(
      _tokenAmount: BigNumberish,
      _path: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    uniRouterAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "uniRouterAddress()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
