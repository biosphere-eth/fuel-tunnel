/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.29.1
  Forc version: 0.32.2
  Fuel-Core version: 0.15.1
*/

import { Interface, Contract } from "fuels";
import type { Provider, BaseWalletLocked, AbstractAddress } from "fuels";
import type { PostmanContractAbi, PostmanContractAbiInterface } from "../PostmanContractAbi";

const _abi = {
  "types": [
    {
      "typeId": 0,
      "type": "()",
      "components": [],
      "typeParameters": null
    },
    {
      "typeId": 1,
      "type": "b256",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 2,
      "type": "bool",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 3,
      "type": "str[8]",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 4,
      "type": "struct Message",
      "components": [
        {
          "name": "from",
          "type": 1,
          "typeArguments": null
        },
        {
          "name": "to",
          "type": 1,
          "typeArguments": null
        },
        {
          "name": "message",
          "type": 3,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    }
  ],
  "functions": [
    {
      "inputs": [
        {
          "name": "contact_addr",
          "type": 1,
          "typeArguments": null
        }
      ],
      "name": "add_contact",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      }
    },
    {
      "inputs": [],
      "name": "initialize",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      }
    },
    {
      "inputs": [],
      "name": "is_registered",
      "output": {
        "name": "",
        "type": 2,
        "typeArguments": null
      }
    },
    {
      "inputs": [
        {
          "name": "contact_addr",
          "type": 1,
          "typeArguments": null
        },
        {
          "name": "msg",
          "type": 3,
          "typeArguments": null
        }
      ],
      "name": "message",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      }
    },
    {
      "inputs": [
        {
          "name": "key",
          "type": 1,
          "typeArguments": null
        }
      ],
      "name": "register",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      }
    }
  ],
  "loggedTypes": [
    {
      "logId": 0,
      "loggedType": {
        "name": "",
        "type": 4,
        "typeArguments": []
      }
    }
  ]
}

export class PostmanContractAbi__factory {
  static readonly abi = _abi
  static createInterface(): PostmanContractAbiInterface {
    return new Interface(_abi) as unknown as PostmanContractAbiInterface
  }
  static connect(
    id: string | AbstractAddress,
    walletOrProvider: BaseWalletLocked | Provider
  ): PostmanContractAbi {
    return new Contract(id, _abi, walletOrProvider) as unknown as PostmanContractAbi
  }
}