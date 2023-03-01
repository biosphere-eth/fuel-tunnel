import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import '../App.css';
import { Wallet, WalletUnlocked, bn, hexlify,Interface, Contract } from "fuels";
// Import the contract factory -- you can find the name in index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { PostmanContractAbi__factory } from "../contracts/factories/PostmanContractAbi__factory";
import { PostmanContractAbi } from "../contracts";


type MessageBox = {
    wallet: WalletUnlocked,
    contract: PostmanContractAbi
};

const MessageBox = ({wallet, contract}:MessageBox) => {
    const MSG_PK = '0x37de64bb3d416707d1833a361c60e0cec856d3bae534619646008abb51e48cb5';
    const MSG_SECRET = bn('0xed385ab156b48da8d72d423905a10d62662c0a3ebc65849254afa1c82d532c39');

    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);


    // check if user registered
    // useEffect(() => {
    //     async function main() {
    //     // Executes the counter function to query the current contract state
    //     // the `.get()` is read-only, because of this it don't expand coins.
    //     const { value } = await contract.functions.is_registered().txParams({ gasPrice: 100 }).call();
    //     // console.log(value);
    //     // const { value } = await contract.functions.is_registered().get();
    //     // console.log(value);
    //     setRegistered(value);
    //     }
    //     main();
    // }, []);

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
    //   const { value } = await contract.functions.is_registered().txParams({ gasPrice: 1000}).call();
      // await contract.functions.add_contact(wallet.address.toHexString()).txParams({ gasPrice: 10 }).call();
      await contract.functions.message(wallet.address.toHexString(), "HELLOabc").txParams({ gasPrice: 1000 }).call();

      const { value } = await contract.functions.is_registered().txParams({ gasPrice: 1000}).call();
      // console.log(value);
      setRegistered(value);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <p>Registered: {String(registered)}</p>
        <button disabled={loading} onClick={register}>
          {loading ? "Registering..." : "Register"}
        </button>
      </header>
    </div>
  );
}

export default MessageBox;