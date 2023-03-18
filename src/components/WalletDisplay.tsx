import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import '../App.css';
import { Wallet, WalletUnlocked, bn, hexlify,Interface, Contract } from "fuels";
// Import the contract factory -- you can find the name in index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { PostmanContractAbi__factory } from "../contracts/factories/PostmanContractAbi__factory";
import { PostmanContractAbi } from "../contracts";
