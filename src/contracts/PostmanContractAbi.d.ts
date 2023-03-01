/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.29.1
  Forc version: 0.32.2
  Fuel-Core version: 0.15.1
*/

import type {
  Interface,
  FunctionFragment,
  DecodedValue,
  Contract,
  BytesLike,
  BigNumberish,
  InvokeFunction,
  BN,
} from 'fuels';

export type MessageInput = { from: string, to: string, message: string };
export type MessageOutput = MessageInput;

interface PostmanContractAbiInterface extends Interface {
  functions: {
    add_contact: FunctionFragment;
    initialize: FunctionFragment;
    is_registered: FunctionFragment;
    message: FunctionFragment;
    register: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'add_contact', values: [string]): Uint8Array;
  encodeFunctionData(functionFragment: 'initialize', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'is_registered', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'message', values: [string, string]): Uint8Array;
  encodeFunctionData(functionFragment: 'register', values: [string]): Uint8Array;

  decodeFunctionData(functionFragment: 'add_contact', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'initialize', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'is_registered', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'message', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'register', data: BytesLike): DecodedValue;
}

export class PostmanContractAbi extends Contract {
  interface: PostmanContractAbiInterface;
  functions: {
    add_contact: InvokeFunction<[contact_addr: string], void>;
    initialize: InvokeFunction<[], void>;
    is_registered: InvokeFunction<[], boolean>;
    message: InvokeFunction<[contact_addr: string, msg: string], void>;
    register: InvokeFunction<[key: string], void>;
  };
}
