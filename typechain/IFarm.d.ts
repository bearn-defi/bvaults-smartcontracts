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
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IFarmInterface extends ethers.utils.Interface {
  functions: {
    "userInfo(uint256,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "userInfo",
    values: [BigNumberish, string]
  ): string;

  decodeFunctionResult(functionFragment: "userInfo", data: BytesLike): Result;

  events: {};
}

export class IFarm extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IFarmInterface;

  functions: {
    userInfo(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      amount: BigNumber;
      rewardDebt: BigNumber;
      bonusDebt: BigNumber;
      fundedBy: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
    }>;

    "userInfo(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      amount: BigNumber;
      rewardDebt: BigNumber;
      bonusDebt: BigNumber;
      fundedBy: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
    }>;
  };

  userInfo(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<{
    amount: BigNumber;
    rewardDebt: BigNumber;
    bonusDebt: BigNumber;
    fundedBy: BigNumber;
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
  }>;

  "userInfo(uint256,address)"(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<{
    amount: BigNumber;
    rewardDebt: BigNumber;
    bonusDebt: BigNumber;
    fundedBy: BigNumber;
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
  }>;

  callStatic: {
    userInfo(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      amount: BigNumber;
      rewardDebt: BigNumber;
      bonusDebt: BigNumber;
      fundedBy: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
    }>;

    "userInfo(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      amount: BigNumber;
      rewardDebt: BigNumber;
      bonusDebt: BigNumber;
      fundedBy: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
    }>;
  };

  filters: {};

  estimateGas: {
    userInfo(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "userInfo(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    userInfo(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "userInfo(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
