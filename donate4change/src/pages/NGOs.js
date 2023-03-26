import { useEffect, useState } from "react";
import React from 'react';
import { Polybase } from "@polybase/client"
import "./About.css";
import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";
import { send } from "@pushprotocol/restapi/src/lib/chat";

const db = new Polybase({
  defaultNamespace: "pk/0xbcbb58bd708784594a6f5d020544c5208e6a1c43c58238307a35df3f47611adc0d251f3c8d0f5fff4b552d6142bdfa9bc835b602b72ccda5390848a08ef3ac90/donate4change",
});
const collectionReference = db.collection("NGO");

function NGOs(){
    const [data, setData] = useState([]);
    const [amt, setAmt] = useState();
    const [ngoKey, setNgoKey] = useState("");

    let contractAddress = "0xfa5e95bdea02bC7BD3C7ba2F6705805975186aD2"
    let abi = [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "to",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amt",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "name": "newTransaction",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "add",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "amt",
              "type": "uint256"
            }
          ],
          "name": "makeTransaction",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAllTransactions",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "to",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "amt",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "time",
                  "type": "uint256"
                }
              ],
              "internalType": "struct Donation.Transaction[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        }
      ]

      useEffect(() => {
        listRecords();
      }, []);

    async function listRecords () {
        const records = await collectionReference.get();
        setData(records.data);

    }

    async function sendNotification(message) {
      const PK = "69e51a9f0c93ff5c52f66795b1434bf07ca827e412b38cfa52b3293ffc816c2e"; // channel private key
      const Pkey = `0x${PK}`;
      const signer = new ethers.Wallet(Pkey);
      const data = await signer.getAddress();

      await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: 'Donate4Change',
          body: `Donation Successfull`
        },
        payload: {
          title: `Donate4Change`,
          body: `${message}`,
          cta: '',
          img: ''
        },
        recipients: 'eip155:5:' + data, // recipient address
        channel: 'eip155:5:0x66a9633AC8E529B6CcD8E4c752901A71FcDf54A7', // your channel address
        onSuccess: () => {
          console.log('opt in success');
         },
         onError: (err) => {
           console.error("Error is:" + err.message);
         },
        env: 'staging'
      });
    }

    function donateNGO(address) {
      donate(address)
    } 

    
    async function donate(address) {
       console.log(address.toString())
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

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

        const tx = await contract.makeTransaction(addressToValue, weiAmountValue);
        console.log(tx)
        sendNotification("You have donated " + ETHAmountValue + " ETH to " + addressToValue + " wei !")
        alert("You have donated " + ETHAmountValue + " ETH to " + addressToValue + " wei !")
    }

    // function getNGOs() {
      listRecords();
    // }

    // STYLE
    const myStyle = {
      fontSize: '20px',
      color: "#3C6255",
      fontStyle : "italic",
    };

    const myStyleBox = {
      width: '300px',
      height: '40px',
      borderRadius: '5px',
      border: '1px solid #345449',
      padding: '5px',
      fontSize: '16px',
      marginLeft : '.9rem',
    };

    const myStyle2 = {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '1000px',
      height: '100px',
      borderRadius: '5px',
      padding: '20px',
      fontSize : '20px',
    };

    const handleChange = event => {
    setAmt(event.target.value);

    console.log('value is:', event.target.value);
    };
    return (
        <div className="about">
            <br></br>
            <center>
              <p style={myStyle}>"Make a difference in someone's life by donating to NGOs. Your support can provide food, education, and medical aid to those in need.<br></br> Join us in creating a better world, one donation at a time."</p>
              <br></br>
            <div style={myStyle2}>
            <p style={myStyle}>Enter amount you wish to donate:</p> 
            
            <input type="text" style={myStyleBox} onChange={handleChange} value={amt} placeholder="Enter your amount in ETH" autoComplete="off"></input>
            </div>
            </center>
            <center>
            <div className="flex-container">
            {data.map((obj, index) => (
                <div className="card" key={index}>
                <p id="title_para">{obj.data.name}</p>
                <p><b>Description:</b> {obj.data.desc}</p>
                <p><b>ID:</b> {obj.data.id}</p>
                <p><b>Phone:</b> {obj.data.phone}</p> <br></br>
                <p><b>NGO Wallet Address:</b> {obj.data.address}</p>
                <center><button onClick={() => donateNGO(obj.data.address)}>Donate Now</button> </center>
                </div>
            ))}
            </div>
            </center>
        </div>
    );
}

export default NGOs;