//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract Donation {
    string[] recipients;
    
    function insertRecipient(string memory _recipient) public {
        recipients.push(_recipient);
    }

    function getRecipient(uint ind) public view returns(string memory) {
        return recipients[ind];
    }
}