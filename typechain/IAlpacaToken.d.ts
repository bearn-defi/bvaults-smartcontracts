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

interface IAlpacaTokenInterface extends ethers.utils.Interface {
  functions: {
    "canUnlockAmount(address)": FunctionFragment;
    "unlock()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "canUnlockAmount",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "unlock", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "canUnlockAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unlock", data: BytesLike): Result;

  events: {};
}

export class IAlpacaToken extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IAlpacaTokenInterface;

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

    unlock(overrides?: Overrides): Promise<PopulatedTransaction>;

    "unlock()"(overrides?: Overrides): Promise<PopulatedTransaction>;
  };
}
