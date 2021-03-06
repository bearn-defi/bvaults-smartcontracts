/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IvPegSwap } from "./IvPegSwap";

export class IvPegSwapFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IvPegSwap {
    return new Contract(address, _abi, signerOrProvider) as IvPegSwap;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "basePool",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "meta_amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "base_amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "minToMint",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
