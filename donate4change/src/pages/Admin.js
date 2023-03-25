import React, { useState } from 'react';
import './Admin.css';
import { useAuth } from "@polybase/react";
import * as eth from "@polybase/eth"

// ADDING ELEMENTS INTO POLYBASE DATABASE
import { Polybase } from "@polybase/client"

const db = new Polybase({ defaultNamespace: "pk/0x9ba24d248a889aaf1f672a06e402c097539ac929498eb969e8dee42e58690f5a36a0057225a825e9248a31fbdfab6c7eb6324837a3423227f71bcdf2ba56d307/Donate4Change" });
const collectionReference = db.collection("Test2");

db.signer(async (data) => {
    // A permission dialog will be presented to the user
    const accounts = await eth.requestAccounts();
  
    // If there is more than one account, you may wish to ask the user which
    // account they would like to use
    const account = accounts[0];
  
    const sig = await eth.sign(data, account);
  
    return { h: "eth-personal-sign", sig };
  })

function Form() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    description: '',
    address: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    createRecord();
  }

  async function createRecord () {
    // .create(args) args array is defined by the constructor fn
    const recordData = await collectionReference.create([
      formData.id, 
      formData.name, 
      formData.phone,
      formData.description,
      formData.address,
      
    //   db.collection("NGO").record()
    ]);
  }

  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
    <div className="form-container">
        <center><b>Add New NGO</b></center>
        <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Public Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default Form;
