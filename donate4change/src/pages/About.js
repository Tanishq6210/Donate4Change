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

    return (
        <div className="about">
            <Helmet>
                <style>{'body { background-color: #EAE7B1; }'}</style>
            </Helmet>
            <h1>About</h1>
            <button className="button" onClick={getUserNotification}>Check Notifications</button>
            <center>
      <table className="table" border={1.5} cellPadding={10} style={{ border: '2px solid black' }}>
        <thead>
        <tr>
            <th>FROM</th>
            <th>TITLE</th>
            <th>MESSAGE</th>
          </tr>
        </thead>
        <tbody>
          {
            notifications.map(
              (info, ind) => {
                return (
                  <tr>
                    <td>{info.app}</td>
                    <td>{info.title}</td>
                    <td>{info.message}</td>
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