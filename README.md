# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Deploy To Testnet

Now that you have a wallet, you can deploy with forc deploy and passing in the testnet endpoint like this:

forc deploy --url node-beta-2.fuel.network/graphql --gas-price 1

    Note: We set the gas price to 1. Without this flag, the gas price is 0 by default and the transaction will fail.

The terminal will ask for the address of the wallet you want to sign this transaction with, paste in the address you saved earlier, it looks like this: fuel1efz7lf36w9da9jekqzyuzqsfrqrlzwtt3j3clvemm6eru8fe9nvqj5kar8

The terminal will output your Contract id like this:

Contract id: 0xe5dc89f7b8c62e40927a6b17f144583bf6571d2468ab1e2554d2731f4c9fc428

Be sure to save this as you will need it to build a frontend with the Typescript SDK later in this tutorial.

The terminal will output a Transaction id to sign and prompt you for a signature. Open a new terminal tab and view your accounts by running forc wallet accounts. If you followed these steps, you'll notice you only have one account, 0.

Grab the message to sign from your other terminal and sign with your account by running the following command:

forc wallet sign --account `[the account index, without brackets]` tx-id `[message to sign, without brackets]`

Your command should look like this:

$ forc wallet sign --account 0 tx-id 16d7a8f9d15cfba1bd000d3f99cd4077dfa1fce2a6de83887afc3f739d6c84df
Please enter your password to decrypt initialized wallet's phrases:
Signature: 736dec3e92711da9f52bed7ad4e51e3ec1c9390f4b05caf10743229295ffd5c1c08a4ca477afa85909173af3feeda7c607af5109ef6eb72b6b40b3484db2332c

Enter your password when prompted, and you'll get back a signature. Save that signature, and return to your other terminal window, and paste that in where its prompting you to provide a signature for this transaction.

Finally, you will get back a TransactionId to confirm your contract was deployed. With this ID, you can head to the block explorer and view your contract.