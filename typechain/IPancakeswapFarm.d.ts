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

interface IPancakeswapFarmInterface extends ethers.utils.Interface {
  functions: {
    "deposit(uint256,uint256)": FunctionFragment;
    "emergencyWithdraw(uint256)": FunctionFragment;
    "enterStaking(uint256)": FunctionFragment;
    "getMultiplier(uint256,uint256)": FunctionFragment;
    "leaveStaking(uint256)": FunctionFragment;
    "pendingBDO(uint256,address)": FunctionFragment;
    "pendingBELT(uint256,address)": FunctionFragment;
    "pendingBusd(uint256,address)": FunctionFragment;
    "pendingCake(uint256,address)": FunctionFragment;
    "pendingMDO(uint256,address)": FunctionFragment;
    "pendingReward(uint256,address)": FunctionFragment;
    "pendingRewards(uint256,address)": FunctionFragment;
    "pendingShare(uint256,address)": FunctionFragment;
    "poolLength()": FunctionFragment;
    "userInfo()": FunctionFragment;
    "withdraw(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyWithdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "enterStaking",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getMultiplier",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "leaveStaking",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingBDO",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingBELT",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingBusd",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingCake",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingMDO",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingReward",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingRewards",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingShare",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "poolLength",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "userInfo", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "emergencyWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enterStaking",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMultiplier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "leaveStaking",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pendingBDO", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingBELT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingBusd",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingCake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pendingMDO", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "poolLength", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "userInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {};
}

export class IPancakeswapFarm extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IPancakeswapFarmInterface;

  functions: {
    deposit(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "deposit(uint256,uint256)"(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    emergencyWithdraw(
      _pid: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "emergencyWithdraw(uint256)"(
      _pid: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    enterStaking(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "enterStaking(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getMultiplier(
      _from: BigNumberish,
      _to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "getMultiplier(uint256,uint256)"(
      _from: BigNumberish,
      _to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    leaveStaking(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "leaveStaking(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    pendingBDO(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "pendingBDO(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    pendingBELT(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "pendingBELT(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    pendingBusd(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "pendingBusd(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    pendingCake(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "pendingCake(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    pendingMDO(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "pendingMDO(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    pendingReward(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "pendingReward(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    pendingRewards(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "pendingRewards(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    pendingShare(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "pendingShare(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    poolLength(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "poolLength()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    userInfo(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "userInfo()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    withdraw(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "withdraw(uint256,uint256)"(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  deposit(
    _pid: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "deposit(uint256,uint256)"(
    _pid: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  emergencyWithdraw(
    _pid: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "emergencyWithdraw(uint256)"(
    _pid: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  enterStaking(
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "enterStaking(uint256)"(
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getMultiplier(
    _from: BigNumberish,
    _to: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getMultiplier(uint256,uint256)"(
    _from: BigNumberish,
    _to: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  leaveStaking(
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "leaveStaking(uint256)"(
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  pendingBDO(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "pendingBDO(uint256,address)"(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  pendingBELT(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "pendingBELT(uint256,address)"(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  pendingBusd(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "pendingBusd(uint256,address)"(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  pendingCake(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "pendingCake(uint256,address)"(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  pendingMDO(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "pendingMDO(uint256,address)"(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  pendingReward(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "pendingReward(uint256,address)"(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  pendingRewards(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "pendingRewards(uint256,address)"(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  pendingShare(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "pendingShare(uint256,address)"(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  poolLength(overrides?: CallOverrides): Promise<BigNumber>;

  "poolLength()"(overrides?: CallOverrides): Promise<BigNumber>;

  userInfo(overrides?: CallOverrides): Promise<BigNumber>;

  "userInfo()"(overrides?: CallOverrides): Promise<BigNumber>;

  withdraw(
    _pid: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "withdraw(uint256,uint256)"(
    _pid: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    deposit(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "deposit(uint256,uint256)"(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    emergencyWithdraw(
      _pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "emergencyWithdraw(uint256)"(
      _pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    enterStaking(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "enterStaking(uint256)"(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getMultiplier(
      _from: BigNumberish,
      _to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getMultiplier(uint256,uint256)"(
      _from: BigNumberish,
      _to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    leaveStaking(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "leaveStaking(uint256)"(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    pendingBDO(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingBDO(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingBELT(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingBELT(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingBusd(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingBusd(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingCake(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingCake(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingMDO(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingMDO(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingReward(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingReward(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingRewards(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingRewards(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingShare(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingShare(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    poolLength(overrides?: CallOverrides): Promise<BigNumber>;

    "poolLength()"(overrides?: CallOverrides): Promise<BigNumber>;

    userInfo(overrides?: CallOverrides): Promise<BigNumber>;

    "userInfo()"(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "withdraw(uint256,uint256)"(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    deposit(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "deposit(uint256,uint256)"(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    emergencyWithdraw(
      _pid: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "emergencyWithdraw(uint256)"(
      _pid: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    enterStaking(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "enterStaking(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getMultiplier(
      _from: BigNumberish,
      _to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getMultiplier(uint256,uint256)"(
      _from: BigNumberish,
      _to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    leaveStaking(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "leaveStaking(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    pendingBDO(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingBDO(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingBELT(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingBELT(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingBusd(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingBusd(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingCake(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingCake(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingMDO(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingMDO(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingReward(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingReward(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingRewards(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingRewards(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingShare(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingShare(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    poolLength(overrides?: CallOverrides): Promise<BigNumber>;

    "poolLength()"(overrides?: CallOverrides): Promise<BigNumber>;

    userInfo(overrides?: CallOverrides): Promise<BigNumber>;

    "userInfo()"(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "withdraw(uint256,uint256)"(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "deposit(uint256,uint256)"(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    emergencyWithdraw(
      _pid: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "emergencyWithdraw(uint256)"(
      _pid: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    enterStaking(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "enterStaking(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getMultiplier(
      _from: BigNumberish,
      _to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getMultiplier(uint256,uint256)"(
      _from: BigNumberish,
      _to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    leaveStaking(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "leaveStaking(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    pendingBDO(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "pendingBDO(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingBELT(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "pendingBELT(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingBusd(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "pendingBusd(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingCake(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "pendingCake(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingMDO(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "pendingMDO(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingReward(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "pendingReward(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingRewards(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "pendingRewards(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingShare(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "pendingShare(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    poolLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "poolLength()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    userInfo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "userInfo()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "withdraw(uint256,uint256)"(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}