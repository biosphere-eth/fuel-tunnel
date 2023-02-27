contract;

use std::auth::*;
use std::logging::log;

pub struct Message {
    // message sender and receiver
    from: b256,
    to: b256,
    // message body
    message: str [8],
}

const ZERO_B256 = 0x0000000000000000000000000000000000000000000000000000000000000000;

abi Postman {
    // Contract that enables single massage passing
    
    #[storage(read,write)]
    fn initialize();
    
    // add an contact to user contact list
    #[storage(read,write)]
    fn register(key: b256);
    
    // add an contact to user contact list
    #[storage(read,write)]
    fn add_contact(contact_addr: b256);
    
    // add an contact to user contact list
    #[storage(read,write)]
    fn message(contact_addr: b256, msg: str[8]);
}

storage {

    // protocol admin
    
    
    // register user with their public key
    user_registry: StorageMap<b256, b256> = StorageMap {},
    
    // contact requests
    //friend_requests: StorageVec<(b256, b256)> = StorageVec {},
    
    // contact lists
    contacts: StorageMap<(b256, b256),bool> = StorageMap {},
    
    // encrypted messages stored on emit messages
    //messages: StorageMap<b256, b256> = StorageMap {},
    
}

impl Postman for Contract {

    #[storage(read,write)]
    fn initialize(){
        
    }
    
    // add an contact to user contact list with its public key
    #[storage(read,write)]
    fn register(key: b256){
        let sender = msg_sender();
        let mut sender_addr = ZERO_B256;
        match sender.unwrap() {
            Identity::Address(addr) => sender_addr = addr.into(),
            _ => revert(0),
        }
        assert(sender_addr != ZERO_B256);
        //add sender of user list
        storage.user_registry.insert(sender_addr,key);
    }
    
    // add an contact to user contact list
    // TODO: make it two way add, and add function to approve contact request 
    #[storage(read,write)]
    fn add_contact(contact_addr: b256){
        let sender = msg_sender();
        let mut sender_addr = ZERO_B256;
        match sender.unwrap() {
            Identity::Address(addr) => sender_addr = addr.into(),
            _ => revert(0),
        }
        assert(sender_addr != ZERO_B256);
        
        // Order addresses and compare with records
        let (addr1, addr2) = if sender_addr < contact_addr {
            (sender_addr, contact_addr)
        } else {
            (contact_addr, sender_addr)
        };
        
        // add contact if not exist
        assert(storage.contacts.get((addr1, addr2)));
        storage.contacts.insert((addr1,addr2),true);
    }
    
    // add an contact to user contact list
    #[storage(read,write)]
    fn message(contact_addr: b256, msg: str[8]){
        let sender = msg_sender();
        let mut sender_addr = ZERO_B256;
        match sender.unwrap() {
            Identity::Address(addr) => sender_addr = addr.into(),
            _ => revert(0),
        }
        assert(sender_addr != ZERO_B256);
        let (addr1, addr2) = if sender_addr < contact_addr {
            (sender_addr, contact_addr)
        } else {
            (contact_addr, sender_addr)
        };
        
        assert(storage.contacts.get((addr1, addr2)));
        log(Message {from:sender_addr, to:contact_addr, message:msg});
        
    }
    

}
