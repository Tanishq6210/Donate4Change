import "./About.css";
import {Helmet} from 'react-helmet';
import one_image from '../images/homee.jpg';
import { useAuth } from "@polybase/react";
import { useState } from "react";
import { ethers } from "ethers"
import * as PushAPI from "@pushprotocol/restapi"
import { ethPersonalSign } from '@polybase/eth'
import { Polybase } from '@polybase/client'
import { useWeb3React } from "@web3-react/core";


export default function Home(){
    //POLYBASE 
    const[details,setDetails] = useState({});
    const [signedIn, setSignedIn] = useState(false);
    const {auth}= useAuth();


    async function sendNotification(message) {
        const PK = process.env.PRIV_KEY; // channel private key
        const Pkey = `0x${PK}`;
        const signer = new ethers.Wallet(Pkey);
    
        await PushAPI.payloads.sendNotification({
          signer,
          type: 3, // target
          identityType: 2, // direct payload
          notification: {
            title: `Transparent Voting System`,
            body: `Vote Confirmation`
          },
          payload: {
            title: `Vote Casted`,
            body: `${message}`,
            cta: '',
            img: ''
          },
          recipients: 'eip155:5:' + details.userId, // recipient address
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

    async function opt_in() {
        const PK = '69e51a9f0c93ff5c52f66795b1434bf07ca827e412b38cfa52b3293ffc816c2e';
        const Pkey = `0x${PK}`;
        const signer = new ethers.Wallet(Pkey);
        console.log("Signer is:" + signer);
        await PushAPI.channels.subscribe({
          signer: signer,
          channelAddress: 'eip155:5:0x66a9633AC8E529B6CcD8E4c752901A71FcDf54A7', 
          userAddress: 'eip155:5:' + details.userId,
          onSuccess: () => {
           console.log('opt in success');
           alert("OptedIn Successfully!!")
          },
          onError: (err) => {
            console.error("Error is:" + err.message);
          },
          env: 'staging'
        })
      }
    
    

    async function SignIn(){
        const authState = await auth.signIn();
        await setSignedIn(true);
        await setDetails(authState);
        console.log("Before")
        await opt_in();
        console.log("After")
    }

    return (
        <div className="about">
            <Helmet>
                <style>{'body { background-color: #fff; }'}</style>
            </Helmet>
            <div className="home_div">
                <div className="home_left">
                <img src={one_image} alt="Image" height={"600px"} />
                </div>
                <div className="home_right">
                    <h1>Small acts of kindness can create big impacts :) </h1><br></br>
                    <p className="para">In times of crisis, NGOs play a crucial role in supporting communities in need. But they can't do it alone. Your donation can help them provide essential services like food, shelter, education, and healthcare to those who need it most. By giving to an NGO, you become part of the solution, bringing hope and relief to people in difficult circumstances. Whether you can give a little or a lot, your donation makes a difference. So let's come together and support these organizations doing important work, and help make the world a better place.</p>
                    <br></br><br></br>
                    {/* POLYBASE SIGN IN */}
                    <button className="button" onClick={() => SignIn()}>Join Us</button>
                    <div style={{visibility:signedIn?"visible":"hidden"}}><p className="details">You have logged In! <br></br> Using : {details.type}, <br></br> User ID : {details.userId}</p></div>
                </div>
            </div>
        </div>
    );
}
// style={{visibility:signedIn?"hidden":"visible"}} 