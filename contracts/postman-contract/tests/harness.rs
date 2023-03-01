use fuels::{prelude::*, tx::ContractId, signers::Wallet, tx::Bytes32};

// Load abi from json
abigen!(Postman, "out/debug/postman_contract-abi.json");

async fn get_contract_instance() -> (Postman, ContractId, Bytes32) {
    // Launch a local network and deploy the contract
    let mut wallets = launch_custom_provider_and_get_wallets(
        WalletsConfig::new(
            Some(1),             /* Single wallet */
            Some(1),             /* Single coin (UTXO) */
            Some(1_000_000_000), /* Amount per coin */
        ),
        None,
        None,
    )
    .await;
    let wallet = wallets.pop().unwrap();

    let id = Contract::deploy(
        "./out/debug/postman_contract.bin",
        &wallet,
        TxParameters::default(),
        StorageConfiguration::with_storage_path(Some(
            "./out/debug/postman_contract-storage_slots.json".to_string(),
        )),
    )
    .await
    .unwrap();

    let wallet_hash = wallet.address().hash();
    let instance = Postman::new(id.clone(), wallet);

    (instance, id.into(), wallet_hash)
}

async fn register_user(contract:&Postman, id:&ContractId, wallet:&Bytes32){
    // In order: gas_price, gas_limit, and maturity
    let my_tx_params = TxParameters::new(None, Some(1_000_000), None);
    contract.methods()
    .register(Bits256(**wallet))
    .tx_params(my_tx_params) // Chain the tx params setting method.
    .call() // Perform the contract call.
    .await; // This is an async call, `.await` for it.
}

#[tokio::test]
async fn can_get_contract_id() {
    let (_instance, _id, _wallet) = get_contract_instance().await;

    // Now you have an instance of your contract you can use to test each function
    // Increment the counter
    // instance.methods().().call().await.unwrap();

    // Get the current value of the counter
    // let result = instance.methods().count().call().await.unwrap();

    // Check that the current value of the counter is 1.
    // Recall that the initial value of the counter was 0.
    // assert_eq!(result.value, 1);
}

#[tokio::test]
async fn can_intialize() {
    let (_instance, _id, _wallet) = get_contract_instance().await;

    // Now you have an instance of your contract you can use to test each function
    
}

#[tokio::test]
async fn can_register() {
    let (_instance, _id, _wallet) = get_contract_instance().await;

    let my_tx_params = TxParameters::new(None, Some(1_000_000), None);

    // no user register
    let pre_registered = _instance.methods().is_registered().tx_params(my_tx_params).call().await; // This is an async call, `.await` for it.
    assert_eq!(pre_registered.unwrap().value, false);   

    // test after registering
    register_user(&_instance, &_id, &_wallet).await;
    let registered = _instance.methods().is_registered().tx_params(my_tx_params).call().await; // This is an async call, `.await` for it.
    assert_eq!(registered.unwrap().value, true);    
}


#[tokio::test]
async fn can_add_contact() {

    let my_tx_params = TxParameters::new(None, Some(1_000_000), None);
    let (_instance, _id, _wallet) = get_contract_instance().await;

    // test after registering
    register_user(&_instance, &_id, &_wallet).await;

    _instance.methods().add_contact(Bits256(*_wallet)).tx_params(my_tx_params).call().await;

    let response = _instance.methods().message(Bits256(*_wallet), "HELLOabc".try_into().unwrap()).tx_params(my_tx_params).call().await;

    // let log_message= contract_instance.logs_with_type::<u64>(&response.receipts)?;
    // let logs = _instance.fetch_logs(&response.unwrap().receipts);
    // let log = logs.first().unwrap();
    
    let log_msg = _instance.logs_with_type::<Message>(&response.unwrap().receipts).unwrap();

    let log = log_msg.first().unwrap();

    let expected_log = Message {
        from: Bits256(*_wallet),
        to: Bits256(*_wallet),
        message: "HELLOabc".try_into().unwrap(),
    };

    assert_eq!(*log, expected_log);

    // TODO: Initialize type and compare
    // assert_eq!(log, "HELLOabc");
// 

    
}
