import { useState, useEffect } from "react";
import "./About.css";
import {Helmet} from 'react-helmet';
import {ethers} from "ethers"
export default function Dashboard(){
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

    const [arr, setVotes_array] = useState([]);

    async function getAllTransactions() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const sig = provider.getSigner();        
        const contract = new ethers.Contract(contractAddress, abi, sig);
        const tx1 = await contract.getAllTransactions();
        setVotes_array(tx1)
        console.log(tx1)
    }

    const myStyle = {
      borderCollapse: 'collapse',
      borderSpacing: '0',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
    };
  
    const tableRowStyle = {
      backgroundColor: '#A6BB8D',
    };
  
    const tableRowStyle2 = {
      backgroundColor: '#61876E',
    };
  
    const tableCellStyle = {
      padding: '10px',
      borderBottom: '2px solid white',
      textAlign: 'center',
    };
    // getAllTransactions()

    useEffect(() => {
      getAllTransactions();
    }, []);
    return (
        <div className="about">
            {/* <button onClick={getAllTransactions}>Get All Transactions</button> */}
            <br></br>
            <br></br>
            <center>
            <table className="table" style={myStyle}>
            <thead>
        <tr style={tableRowStyle2}>
            <th style={tableCellStyle}>FROM ADDRESS</th>
            <th style={tableCellStyle}>TO ADDRESS</th>
            <th style={tableCellStyle}>AMOUNT(in wei)</th>
            <th style={tableCellStyle}>TIME</th>
          </tr>
        </thead>
        <tbody>
          {
            arr.map(
              (info, ind) => {
                return (
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>{info[0]}</td>
                    <td style={tableCellStyle}>{info[1]}</td>
                    <td style={tableCellStyle}>{info[2].toNumber()}</td>
                    <td style={tableCellStyle}>{info[3].toNumber()}</td>
                  </tr>
                )
              }
            )
          }
        </tbody>
    </table>
    </center>
    <br></br><br></br>
        </div>
    );

}