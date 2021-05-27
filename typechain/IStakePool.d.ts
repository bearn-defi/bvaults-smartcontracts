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

interface IStakePoolInterface extends ethers.utils.Interface {
  functions: {
    "allowRecoverRewardToken(address)": FunctionFragment;
    "claimReward()": FunctionFragment;
    "emergencyWithdraw()": FunctionFragment;
    "getAllRewards(address)": FunctionFragment;
    "getReward(uint8,address)": FunctionFragment;
    "getRewardPerBlock(uint8)": FunctionFragment;
    "pendingReward(uint8,address)": FunctionFragment;
    "rewardPoolInfoLength()": FunctionFragment;
    "stake(uint256)": FunctionFragment;
    "stakeFor(address)": FunctionFragment;
    "stakeToken()": FunctionFragment;
    "unfrozenStakeTime(address)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "allowRecoverRewardToken",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "claimReward",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyWithdraw",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAllRewards",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getReward",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getRewardPerBlock",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingReward",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "rewardPoolInfoLength",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "stake", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "stakeFor", values: [string]): string;
  encodeFunctionData(
    functionFragment: "stakeToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "unfrozenStakeTime",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "allowRecoverRewardToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "emergencyWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getReward", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRewardPerBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardPoolInfoLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stakeFor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stakeToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unfrozenStakeTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {};
}

export class IStakePool extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IStakePoolInterface;

  functions: {
    allowRecoverRewardToken(
      _token: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "allowRecoverRewardToken(address)"(
      _token: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    claimReward(overrides?: Overrides): Promise<ContractTransaction>;

    "claimReward()"(overrides?: Overrides): Promise<ContractTransaction>;

    emergencyWithdraw(overrides?: Overrides): Promise<ContractTransaction>;

    "emergencyWithdraw()"(overrides?: Overrides): Promise<ContractTransaction>;

    getAllRewards(
      _account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "getAllRewards(address)"(
      _account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getReward(
      _pid: BigNumberish,
      _account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "getReward(uint8,address)"(
      _pid: BigNumberish,
      _account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getRewardPerBlock(
      pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "getRewardPerBlock(uint8)"(
      pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    pendingReward(
      _pid: BigNumberish,
      _account: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "pendingReward(uint8,address)"(
      _pid: BigNumberish,
      _account: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    rewardPoolInfoLength(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "rewardPoolInfoLength()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    stake(
      arg0: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "stake(uint256)"(
      arg0: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    stakeFor(
      _account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "stakeFor(address)"(
      _account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    stakeToken(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "stakeToken()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    unfrozenStakeTime(
      _account: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "unfrozenStakeTime(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    withdraw(
      arg0: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "withdraw(uint256)"(
      arg0: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  allowRecoverRewardToken(
    _token: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "allowRecoverRewardToken(address)"(
    _token: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  claimReward(overrides?: Overrides): Promise<ContractTransaction>;

  "claimReward()"(overrides?: Overrides): Promise<ContractTransaction>;

  emergencyWithdraw(overrides?: Overrides): Promise<ContractTransaction>;

  "emergencyWithdraw()"(overrides?: Overrides): Promise<ContractTransaction>;

  getAllRewards(
    _account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "getAllRewards(address)"(
    _account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getReward(
    _pid: BigNumberish,
    _account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "getReward(uint8,address)"(
    _pid: BigNumberish,
    _account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getRewardPerBlock(
    pid: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getRewardPerBlock(uint8)"(
    pid: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  pendingReward(
    _pid: BigNumberish,
    _account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "pendingReward(uint8,address)"(
    _pid: BigNumberish,
    _account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  rewardPoolInfoLength(overrides?: CallOverrides): Promise<BigNumber>;

  "rewardPoolInfoLength()"(overrides?: CallOverrides): Promise<BigNumber>;

  stake(
    arg0: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "stake(uint256)"(
    arg0: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  stakeFor(
    _account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "stakeFor(address)"(
    _account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  stakeToken(overrides?: CallOverrides): Promise<string>;

  "stakeToken()"(overrides?: CallOverrides): Promise<string>;

  unfrozenStakeTime(
    _account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "unfrozenStakeTime(address)"(
    _account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  withdraw(
    arg0: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "withdraw(uint256)"(
    arg0: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    allowRecoverRewardToken(
      _token: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "allowRecoverRewardToken(address)"(
      _token: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    claimReward(overrides?: CallOverrides): Promise<void>;

    "claimReward()"(overrides?: CallOverrides): Promise<void>;

    emergencyWithdraw(overrides?: CallOverrides): Promise<void>;

    "emergencyWithdraw()"(overrides?: CallOverrides): Promise<void>;

    getAllRewards(_account: string, overrides?: CallOverrides): Promise<void>;

    "getAllRewards(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getReward(
      _pid: BigNumberish,
      _account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "getReward(uint8,address)"(
      _pid: BigNumberish,
      _account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getRewardPerBlock(
      pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getRewardPerBlock(uint8)"(
      pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingReward(
      _pid: BigNumberish,
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingReward(uint8,address)"(
      _pid: BigNumberish,
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rewardPoolInfoLength(overrides?: CallOverrides): Promise<BigNumber>;

    "rewardPoolInfoLength()"(overrides?: CallOverrides): Promise<BigNumber>;

    stake(arg0: BigNumberish, overrides?: CallOverrides): Promise<void>;

    "stake(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stakeFor(_account: string, overrides?: CallOverrides): Promise<void>;

    "stakeFor(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    stakeToken(overrides?: CallOverrides): Promise<string>;

    "stakeToken()"(overrides?: CallOverrides): Promise<string>;

    unfrozenStakeTime(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "unfrozenStakeTime(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(arg0: BigNumberish, overrides?: CallOverrides): Promise<void>;

    "withdraw(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    allowRecoverRewardToken(
      _token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "allowRecoverRewardToken(address)"(
      _token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimReward(overrides?: Overrides): Promise<BigNumber>;

    "claimReward()"(overrides?: Overrides): Promise<BigNumber>;

    emergencyWithdraw(overrides?: Overrides): Promise<BigNumber>;

    "emergencyWithdraw()"(overrides?: Overrides): Promise<BigNumber>;

    getAllRewards(_account: string, overrides?: Overrides): Promise<BigNumber>;

    "getAllRewards(address)"(
      _account: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getReward(
      _pid: BigNumberish,
      _account: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "getReward(uint8,address)"(
      _pid: BigNumberish,
      _account: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getRewardPerBlock(
      pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getRewardPerBlock(uint8)"(
      pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingReward(
      _pid: BigNumberish,
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingReward(uint8,address)"(
      _pid: BigNumberish,
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rewardPoolInfoLength(overrides?: CallOverrides): Promise<BigNumber>;

    "rewardPoolInfoLength()"(overrides?: CallOverrides): Promise<BigNumber>;

    stake(arg0: BigNumberish, overrides?: Overrides): Promise<BigNumber>;

    "stake(uint256)"(
      arg0: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    stakeFor(_account: string, overrides?: Overrides): Promise<BigNumber>;

    "stakeFor(address)"(
      _account: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    stakeToken(overrides?: CallOverrides): Promise<BigNumber>;

    "stakeToken()"(overrides?: CallOverrides): Promise<BigNumber>;

    unfrozenStakeTime(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "unfrozenStakeTime(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(arg0: BigNumberish, overrides?: Overrides): Promise<BigNumber>;

    "withdraw(uint256)"(
      arg0: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    allowRecoverRewardToken(
      _token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "allowRecoverRewardToken(address)"(
      _token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimReward(overrides?: Overrides): Promise<PopulatedTransaction>;

    "claimReward()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    emergencyWithdraw(overrides?: Overrides): Promise<PopulatedTransaction>;

    "emergencyWithdraw()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    getAllRewards(
      _account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getAllRewards(address)"(
      _account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getReward(
      _pid: BigNumberish,
      _account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getReward(uint8,address)"(
      _pid: BigNumberish,
      _account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getRewardPerBlock(
      pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getRewardPerBlock(uint8)"(
      pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingReward(
      _pid: BigNumberish,
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "pendingReward(uint8,address)"(
      _pid: BigNumberish,
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rewardPoolInfoLength(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "rewardPoolInfoLength()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stake(
      arg0: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "stake(uint256)"(
      arg0: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    stakeFor(
      _account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "stakeFor(address)"(
      _account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    stakeToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "stakeToken()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    unfrozenStakeTime(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "unfrozenStakeTime(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      arg0: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "withdraw(uint256)"(
      arg0: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
