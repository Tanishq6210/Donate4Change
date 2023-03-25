//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract Donation {
    struct Transaction{
        address from;
        string to;
        uint amt;
        uint time;
    }

    Transaction[] transactions;
    
    event newTransaction(address indexed from, string to, uint amt, uint timestamp);

    function makeTransaction(string memory add, uint amt) public {
        Transaction memory temp = Transaction(msg.sender, add, amt, block.timestamp);
        transactions.push(temp);
        emit newTransaction(msg.sender, add, amt, block.timestamp);
    }

    function getAllTransactions() public view returns(Transaction[] memory){
        return transactions;
    }
}