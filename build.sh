cd contracts/postman-contract && forc build
cd ../..
npx fuels typegen -i ./contracts/postman-contract/out/debug/*-abi.json -o ./src/contracts