import {useState} from 'react'
import "./About.css";
import {Helmet} from 'react-helmet';
import * as PushAPI from "@pushprotocol/restapi";
import {ethers} from 'ethers';

export default function Admin(){
    const [notifications, setNotifications] = useState([])
    async function getUserNotification() {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const data = await signer.getAddress();

        const notifications = await PushAPI.user.getFeeds({
          user: 'eip155:5:' + data, // user address in CAIP
          env: 'staging'
        });

        console.log("Notifications---------")
        console.log(notifications)
        setNotifications(notifications)
    }

    const myStyle = {
      borderCollapse: 'collapse',
      borderSpacing: '0',
      width: '100%',
      maxWidth: '800px',
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

    return (
        <div className="about">
            <button className="button" onClick={getUserNotification}>Check Notifications</button>
            <center>
      <table className="table" style={myStyle}>
        <thead>
        <tr style={tableRowStyle2}>
            <th style={tableCellStyle}>FROM</th>
            <th style={tableCellStyle}>TITLE</th>
            <th style={tableCellStyle}>MESSAGE</th>
          </tr>
        </thead>
        <tbody>
          {
            notifications.map(
              (info, ind) => {
                return (
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>{info.app}</td>
                    <td style={tableCellStyle}>{info.title}</td>
                    <td style={tableCellStyle}>{info.message}</td>
                  </tr>
                )
              }
            )
          }
        </tbody>
    </table>
    </center>
        </div>
    );

}