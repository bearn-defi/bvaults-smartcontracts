/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IAlpacaToken } from "./IAlpacaToken";

export class IAlpacaTokenFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IAlpacaToken {
    return new Contract(address, _abi, signerOrProvider) as IAlpacaToken;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "canUnlockAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
