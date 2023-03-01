const { Wallet } = require("fuels");

const wallet = Wallet.generate();




const CreateWallet = () => {
    const wallet = Wallet.generate();
    console.log("address", wallet.address.toString());
    console.log("private key", wallet.privateKey);
    return wallet;
}
export default CreateWallet;