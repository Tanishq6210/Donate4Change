import { useState } from "react";
import React from 'react';
import { Polybase } from "@polybase/client"
import "./About.css";
import {Helmet} from 'react-helmet';
import { ethers } from "ethers";

const db = new Polybase({
  defaultNamespace: "pk/0xbcbb58bd708784594a6f5d020544c5208e6a1c43c58238307a35df3f47611adc0d251f3c8d0f5fff4b552d6142bdfa9bc835b602b72ccda5390848a08ef3ac90/donate4change",
});
const collectionReference = db.collection("NGO");

function NGOs(){
    const [data, setData] = useState([]);
    const [amt, setAmt] = useState("0");
    const [ngoKey, setNgoKey] = useState("");

    let abi = [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_recipient",
              "type": "string"
            }
          ],
          "name": "insertRecipient",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "ind",
              "type": "uint256"
            }
          ],
          "name": "getRecipient",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        }
      ]
  
    let contractAddress = "0xbC04eBd43668455D8E77bb3B96C947507d9feE"

    async function listRecords () {
        const records = await collectionReference.get();
        setData(records.data);

    }

    function donateNGO(address) {
      donate(address)
    } 

    async function donate(address) {
      console.log(address.toString())
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const addressToValue = address;
        const ETHAmountValue = amt;
        console.log(addressToValue + " " + ETHAmountValue);
        // Calculate amount to transfer in wei
        const weiAmountValue = ethers.utils.parseEther(ETHAmountValue) //parseInt(ETHAmountValue) * 10**18

        // // Form the transaction request for sending ETH
        const transactionRequest = {
          to: addressToValue.toString(),
          value: weiAmountValue.toString()
        }

        // // Send the transaction and log the receipt
        const receipt = await signer.sendTransaction(transactionRequest);
        console.log(receipt);
    }

    // function getNGOs() {
      listRecords();
    // }

    const handleChange = event => {
    setAmt(event.target.value);

    console.log('value is:', event.target.value);
    };
    return (
        <div className="about">
            <center><h1>NGOs</h1></center>
            <center>
            <div className="flex-container">
            {data.map((obj, index) => (
                <div className="card" key={index}>
                <p id="title_para">{obj.data.name}</p>
                <p>ID: {obj.data.id}</p>
                <p>Description: {obj.data.desc}</p>
                <p>Phone: {obj.data.phone}</p>
                <p>NGO Key: {obj.data.address}</p>
                <div>
                Enter amount you want to donate: 
                </div> 
                <button onClick={() => donateNGO(obj.data.address)}>Donate Now</button> 
                </div>
            ))}
            </div>
            <input type="text" width = "20%"onChange={handleChange} value={amt} autoComplete="off"></input>
            {/* <button onClick={getNGOs()}>Show NGOs</button> */}
            </center>
        </div>
    );
}

export default NGOs;