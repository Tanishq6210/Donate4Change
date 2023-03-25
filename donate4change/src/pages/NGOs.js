import { useState } from "react";
import React from 'react';
import { Polybase } from "@polybase/client"
import "./About.css";
import {Helmet} from 'react-helmet';

const db = new Polybase({ defaultNamespace: "pk/0x9ba24d248a889aaf1f672a06e402c097539ac929498eb969e8dee42e58690f5a36a0057225a825e9248a31fbdfab6c7eb6324837a3423227f71bcdf2ba56d307/Donate4Change" });
const collectionReference = db.collection("Test2");

function NGOs(){
    const [data, setData] = useState([]);

    async function listRecords () {
        const records = await collectionReference.get();
        setData(records.data);

    }
    // console.log(data);

    function donateNGO(address) {
        // var amount = document.getElementById("amount").value;
    }

    listRecords();
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
                <p>NGO Key: {obj.data.ngo_Key}</p>
                <div>
                Enter amount you want to donate: 
                </div> 
                <button onClick={donateNGO(obj.data.ngo_key)}>Donate Now</button> <input type="text" width = "20%" id="amount"></input>
                </div>
            ))}
            </div>
            </center>
        </div>
    );
}

export default NGOs;