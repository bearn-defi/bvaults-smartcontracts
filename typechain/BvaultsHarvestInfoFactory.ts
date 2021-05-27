/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { BvaultsHarvestInfo } from "./BvaultsHarvestInfo";

export class BvaultsHarvestInfoFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<BvaultsHarvestInfo> {
    return super.deploy(overrides || {}) as Promise<BvaultsHarvestInfo>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BvaultsHarvestInfo {
    return super.attach(address) as BvaultsHarvestInfo;
  }
  connect(signer: Signer): BvaultsHarvestInfoFactory {
    return super.connect(signer) as BvaultsHarvestInfoFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BvaultsHarvestInfo {
    return new Contract(address, _abi, signerOrProvider) as BvaultsHarvestInfo;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "ExecuteTransaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "executor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "at",
        type: "uint256",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "executeTransaction",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "farmingPoolIds",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "farmingPoolTypes",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "farmingPools",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "inCaseTokensGetStuck",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "operator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_strategy",
        type: "address",
      },
    ],
    name: "pending",
    outputs: [
      {
        internalType: "uint256",
        name: "_pending",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_strategy",
        type: "address",
      },
    ],
    name: "pendingDollarValue",
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
    inputs: [
      {
        internalType: "address",
        name: "_strategy",
        type: "address",
      },
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_type",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
    ],
    name: "setStrategyFarmingPoolConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_uniRouterAddress",
        type: "address",
      },
    ],
    name: "setUniRouterAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "toBusdPath",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenAmount",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
    ],
    name: "uniExchangeRate",
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
    name: "uniRouterAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526000805460ff60a01b19169055600180546001600160a01b0319167305ff2b0db69458a0750badebc4f9e13add608c7f17905534801561004357600080fd5b5061157b806100536000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80635eebea20116100975780637ff8dfcd116100665780637ff8dfcd146105b55780638129fc1c146105ee578063e6378848146105f6578063eec0660014610629576100f5565b80635eebea201461048d57806367206d40146104c05780636804d54a14610503578063693a090b146105ad576100f5565b80632224fa25116100d35780632224fa251461024957806342019e4c1461040d578063570ca735146104525780635da79d631461045a576100f5565b806303ab98f7146100fa57806305bde367146101d1578063158ef93e1461022d575b600080fd5b6101cf600480360360a081101561011057600080fd5b73ffffffffffffffffffffffffffffffffffffffff823581169260208101359091169160408201359160608101359181019060a08101608082013564010000000081111561015d57600080fd5b82018360208201111561016f57600080fd5b8035906020019184602083028401116401000000008311171561019157600080fd5b91908080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525092955061065c945050505050565b005b610204600480360360208110156101e757600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610754565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b61023561077c565b604080519115158252519081900360200190f35b6103986004803603608081101561025f57600080fd5b73ffffffffffffffffffffffffffffffffffffffff8235169160208101359181019060608101604082013564010000000081111561029c57600080fd5b8201836020820111156102ae57600080fd5b803590602001918460018302840111640100000000831117156102d057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929594936020810193503591505064010000000081111561032357600080fd5b82018360208201111561033557600080fd5b8035906020019184600183028401116401000000008311171561035757600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061079d945050505050565b6040805160208082528351818301528351919283929083019185019080838360005b838110156103d25781810151838201526020016103ba565b50505050905090810190601f1680156103ff5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6104406004803603602081101561042357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610b2f565b60408051918252519081900360200190f35b610204610b41565b6101cf6004803603602081101561047057600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610b5d565b610440600480360360208110156104a357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610c14565b6101cf600480360360608110156104d657600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359160409091013516610ec6565b6104406004803603604081101561051957600080fd5b8135919081019060408101602082013564010000000081111561053b57600080fd5b82018360208201111561054d57600080fd5b8035906020019184602083028401116401000000008311171561056f57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550610fd8945050505050565b61020461119a565b610204600480360360408110156105cb57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356111b6565b6101cf6111f8565b6104406004803603602081101561060c57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661133f565b6104406004803603602081101561063f57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611410565b60005473ffffffffffffffffffffffffffffffffffffffff1633146106cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260278152602001806114e46027913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff858116600090815260026020908152604080832080547fffffffffffffffffffffffff00000000000000000000000000000000000000001694891694909417909355600381528282208690556004815282822085905560058152919020825161074c92840190611422565b505050505050565b60026020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b60005474010000000000000000000000000000000000000000900460ff1681565b60005460609073ffffffffffffffffffffffffffffffffffffffff163314610810576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260278152602001806114e46027913960400191505060405180910390fd5b60608351600014156108235750816108d9565b83805190602001208360405160200180837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260040182805190602001908083835b602083106108a157805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101610864565b6001836020036101000a0380198251168184511680821785525050505050509050019250505060405160208183030381529060405290505b600060608773ffffffffffffffffffffffffffffffffffffffff1687846040518082805190602001908083835b6020831061094357805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101610906565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d80600081146109a5576040519150601f19603f3d011682016040523d82523d6000602084013e6109aa565b606091505b509150915081610a05576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603b81526020018061150b603b913960400191505060405180910390fd5b8773ffffffffffffffffffffffffffffffffffffffff167f88405ca50016c636e025868e263efe5a9f63bf11cc45404f7616394c7dc389d0888888604051808481526020018060200180602001838103835285818151815260200191508051906020019080838360005b83811015610a87578181015183820152602001610a6f565b50505050905090810190601f168015610ab45780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b83811015610ae7578181015183820152602001610acf565b50505050905090810190601f168015610b145780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a2979650505050505050565b60046020526000908152604090205481565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff163314610bcd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260278152602001806114e46027913960400191505060405180910390fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b73ffffffffffffffffffffffffffffffffffffffff80821660009081526002602052604081205490911680610c4d576000915050610ec1565b73ffffffffffffffffffffffffffffffffffffffff831660009081526003602090815260408083205460049092529091205480610d26578273ffffffffffffffffffffffffffffffffffffffff16631175a1dd83876040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b158015610cf357600080fd5b505afa158015610d07573d6000803e3d6000fd5b505050506040513d6020811015610d1d57600080fd5b50519350610ebd565b8060011415610d9e578273ffffffffffffffffffffffffffffffffffffffff16633381d2cc83876040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b158015610cf357600080fd5b8060021415610e16578273ffffffffffffffffffffffffffffffffffffffff1663cf4b55cb83876040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b158015610cf357600080fd5b8060031415610ebd578273ffffffffffffffffffffffffffffffffffffffff1663242bdd9d83876040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b158015610e8e57600080fd5b505afa158015610ea2573d6000803e3d6000fd5b505050506040513d6020811015610eb857600080fd5b505193505b5050505b919050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610f36576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260278152602001806114e46027913960400191505060405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb82846040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015610fa757600080fd5b505af1158015610fbb573d6000803e3d6000fd5b505050506040513d6020811015610fd157600080fd5b5050505050565b600154604080517fd06ca61f000000000000000000000000000000000000000000000000000000008152600481018581526024820192835284516044830152845160009460609473ffffffffffffffffffffffffffffffffffffffff9091169363d06ca61f9389938993919260640190602080860191028083838d5b8381101561106c578181015183820152602001611054565b50505050905001935050505060006040518083038186803b15801561109057600080fd5b505afa1580156110a4573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405260208110156110eb57600080fd5b810190808051604051939291908464010000000082111561110b57600080fd5b90830190602082018581111561112057600080fd5b825186602082028301116401000000008211171561113d57600080fd5b82525081516020918201928201910280838360005b8381101561116a578181015183820152602001611152565b5050505090500160405250505090508060018251038151811061118957fe5b602002602001015191505092915050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b600560205281600052604060002081815481106111cf57fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff169150829050565b60005474010000000000000000000000000000000000000000900460ff161561128257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f427661756c747342616e6b3a20616c726561647920696e697469616c697a6564604482015290519081900360640190fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000009081167305ff2b0db69458a0750badebc4f9e13add608c7f17909155600080547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff167401000000000000000000000000000000000000000017909116339081179091556040805143815290517f25ff68dd81b34665b5ba7e553ee5511bf6812e12adb4a7e2c0d9e26b3099ce799181900360200190a2565b60008061134b83610c14565b905080156114065761140181600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054806020026020016040519081016040528092919081815260200182805480156113f757602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff1681526001909101906020018083116113cc575b5050505050610fd8565b611409565b60005b9392505050565b60036020526000908152604090205481565b82805482825590600052602060002090810192821561149c579160200282015b8281111561149c57825182547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff909116178255602090920191600190910190611442565b506114a89291506114ac565b5090565b5b808211156114a85780547fffffffffffffffffffffffff00000000000000000000000000000000000000001681556001016114ad56fe427661756c747342616e6b3a2063616c6c6572206973206e6f7420746865206f70657261746f725374726174583a3a657865637574655472616e73616374696f6e3a205472616e73616374696f6e20657865637574696f6e2072657665727465642ea2646970667358221220595a1afa8902f6a1c8a2685768ab2ce2ec13eff628eeecbb55febf1ad79f115a64736f6c634300060c0033";