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

interface IMdgLockerInterface extends ethers.utils.Interface {
  functions: {
    "canUnlockAmount(address)": FunctionFragment;
    "lock(address,uint256)": FunctionFragment;
    "lockOf(address)": FunctionFragment;
    "released(address)": FunctionFragment;
    "totalLock()": FunctionFragment;
    "unlock()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "canUnlockAmount",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "lock",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "lockOf", values: [string]): string;
  encodeFunctionData(functionFragment: "released", values: [string]): string;
  encodeFunctionData(functionFragment: "totalLock", values?: undefined): string;
  encodeFunctionData(functionFragment: "unlock", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "canUnlockAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lockOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "released", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalLock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unlock", data: BytesLike): Result;

  events: {};
}

export class IMdgLocker extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IMdgLockerInterface;

  functions: {
    canUnlockAmount(
      _account: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "canUnlockAmount(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    lock(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "lock(address,uint256)"(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    lockOf(
      _account: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "lockOf(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    released(
      _account: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "released(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    totalLock(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "totalLock()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    unlock(overrides?: Overrides): Promise<ContractTransaction>;

    "unlock()"(overrides?: Overrides): Promise<ContractTransaction>;
  };

  canUnlockAmount(
    _account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "canUnlockAmount(address)"(
    _account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  lock(
    _account: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "lock(address,uint256)"(
    _account: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  lockOf(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

  "lockOf(address)"(
    _account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  released(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

  "released(address)"(
    _account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  totalLock(overrides?: CallOverrides): Promise<BigNumber>;

  "totalLock()"(overrides?: CallOverrides): Promise<BigNumber>;

  unlock(overrides?: Overrides): Promise<ContractTransaction>;

  "unlock()"(overrides?: Overrides): Promise<ContractTransaction>;

  callStatic: {
    canUnlockAmount(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "canUnlockAmount(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lock(
      _account: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "lock(address,uint256)"(
      _account: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    lockOf(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    "lockOf(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    released(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    "released(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalLock(overrides?: CallOverrides): Promise<BigNumber>;

    "totalLock()"(overrides?: CallOverrides): Promise<BigNumber>;

    unlock(overrides?: CallOverrides): Promise<void>;

    "unlock()"(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    canUnlockAmount(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "canUnlockAmount(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lock(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "lock(address,uint256)"(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    lockOf(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    "lockOf(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    released(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    "released(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalLock(overrides?: CallOverrides): Promise<BigNumber>;

    "totalLock()"(overrides?: CallOverrides): Promise<BigNumber>;

    unlock(overrides?: Overrides): Promise<BigNumber>;

    "unlock()"(overrides?: Overrides): Promise<BigNumber>;
  };

  populateTransaction: {
    canUnlockAmount(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "canUnlockAmount(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lock(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "lock(address,uint256)"(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    lockOf(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "lockOf(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    released(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "released(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalLock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "totalLock()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    unlock(overrides?: Overrides): Promise<PopulatedTransaction>;

    "unlock()"(overrides?: Overrides): Promise<PopulatedTransaction>;
  };
}
