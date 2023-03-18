import React, { useEffect, useState } from "react";
import './App.css';
import { Wallet, bn, hexlify} from "fuels";
// Import the contract factory -- you can find the name in index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { PostmanContractAbi__factory } from "../contracts/factories/PostmanContractAbi__factory";

// Connects out Contract instance to the deployed contract
// address using the given wallet.
export {};