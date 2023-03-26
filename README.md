# Donate4Change 💚

### Our Team
Member | Role
------------- | -------------
Tanishq Tyagi   | Team Lead (Blockchain Developer)
Priyanka  |  Blockchain Developer

##  Our Project

Our project Donate4Change aims to leverage the power of blockchain technology to create a transparent and tamper-proof NGO Donation System. Our project is a blockchain-based donation system designed specifically for non-profit organizations (NGOs). This system provides a transparent, secure, and decentralized way for donors to contribute to their favorite NGOs. The system is built on a decentralized ledger, which allows for all transactions to be recorded in a transparent and secure manner. This ensures that all donations are traceable, and that there is no possibility for fraud or corruption. One of the key features of our system is the use of smart contracts. These contracts automate the donation process and ensure that funds are distributed according to pre-defined rules. Our system also allows donors to track the progress of their donations in real-time. This gives them a sense of transparency and accountability, and helps to build trust between donors and NGOs.

We have implemented the Push protocol for sending notifications. We have used the Scroll testnet network to Deploy our contract to make transactions and to store them on the Scroll Alpha Testnet network. Also, we have used Polybase Authentication and Polybase Explorer which acts as a Database for our project to store NGO Details. Here Polybase acts as the backbone of our project.

## Modules
- *Home page*: We have the option to sign in to metamask by using Polybase Authentication and opt-in to our Push Dashboard channel.

- *NGO page*: On this page, we fetch all the NGO's data from the polybase collection and display them. Also, we have the option to send the ETH from the user account to the specified NGO address which we have stored on our Polybase Collection. This Transaction will be stored on the contract which we have deployed on Scroll Alpha Testnet 
(Contract Address: 0xfa5e95bdea02bC7BD3C7ba2F6705805975186aD2) 
We also send the "Push" notification for successful transfer.

- *Add NGO*: This page allows the Admin to add a new NGO and store it to our Polybase Collection

- *Donation Logs page*: On this page, we are fetching all the donation/transaction details from the contract.

- *Push Notification page*: Here, we are fetching all the notifications which are sent by the channel to the user.

## How to Run ?
Add .env file and add Private Key and mnemonic
> Run the command : npm start
>> Import necessary libraries before running the above command
