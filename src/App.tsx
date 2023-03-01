import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Wallet, bn, hexlify} from "fuels";
// Import the contract factory -- you can find the name in index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { PostmanContractAbi__factory } from "./contracts/factories/PostmanContractAbi__factory";

import MessageBox from "./components/MessageBox" 


// The address of the contract deployed the Fuel testnet
const CONTRACT_ID =
  "0xc48e025c3b129b3f2412d2d3165032c4ebc0fc19f20afa0e6b7cd6f28cee6ed4";

//the private key from createWallet.js
const WALLET_SECRET =
  "0xed385ab156b48da8d72d423905a10d62662c0a3ebc65849254afa1c82d532c39";

// Create a Wallet from given secretKey in this case
// The one we configured at the chainConfig.json
const wallet = Wallet.fromPrivateKey(
  WALLET_SECRET,
  "https://node-beta-2.fuel.network/graphql"
);


// Connects out Contract instance to the deployed contract
// address using the given wallet.
const contract = PostmanContractAbi__factory.connect(CONTRACT_ID, wallet);

function App() {

  const MSG_PK = '0x37de64bb3d416707d1833a361c60e0cec856d3bae534619646008abb51e48cb5';
  const MSG_SECRET = bn('0xed385ab156b48da8d72d423905a10d62662c0a3ebc65849254afa1c82d532c39');

  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const messageBoxArgs = {
    wallet: wallet,
    contract: contract,
  }
  

  return (
    <div className="App">
      
        <MessageBox {...messageBoxArgs} />
    </div>
  );
}

export default App;
