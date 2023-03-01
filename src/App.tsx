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
  "0x8214e38080d1f46472963fbfb5f36c6c255339468dc7f495ba641a173fab3344";

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
  
  // check if user registered
  useEffect(() => {
    async function main() {
      // Executes the counter function to query the current contract state
      // the `.get()` is read-only, because of this it don't expand coins.
      const { value } = await contract.functions.is_registered().txParams({ gasPrice: 1 }).call();
      console.log(value);
      // const { value } = await contract.functions.is_registered().get();
      // console.log(value);
      // setRegistered(value);
    }
    main();
  }, []);

  // register user
  async function register() {
    // a loading state
    setLoading(true);
    // Creates a transactions to call the increment function
    // because it creates a TX and updates the contract state this requires the wallet to have enough coins to cover the costs and also to sign the Transaction
    try {

      // await contract.functions.register(MSG_PK).txParams({ gasPrice: 10 }).call();
      // await contract.functions.add_contact(wallet.address.toHexString()).txParams({ gasPrice: 10 }).call();
      // await contract.functions.is_registered().txParams({ gasPrice: 1 }).call();
      const { value } = await contract.functions.is_registered().txParams({ gasPrice: 10 }).call();
      // await contract.functions.add_contact(wallet.address.toHexString()).txParams({ gasPrice: 10 }).call();
      await contract.functions.message(wallet.address.toHexString(), "HELLO").txParams({ gasPrice: 10 }).call();
      // console.log(value);
      setRegistered(value);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="App">
      
        <MessageBox wallet={wallet} contract={contract} />
    </div>
  );
}

export default App;
