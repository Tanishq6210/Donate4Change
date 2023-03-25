import React, { Component } from "react";
import Navbar from "./components/navbar";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NGOs from "./pages/NGOs"
import About from "./pages/About";
import './App.css';
import { Route, Routes } from "react-router-dom";

import { PolybaseProvider, AuthProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth"

const polybase = new Polybase();
const auth = new Auth()

function App() {
  return (
    <>
    <PolybaseProvider polybase={polybase}>
      <AuthProvider auth={auth} polybase={polybase}>
      <Navbar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/NGOs" element={<NGOs/>}/>
            <Route path="/Dashboard" element={<Dashboard/>}/>
            <Route path="/Admin" element={<Admin/>}/>
            <Route path="/About" element={<About/>}/>
          </Routes>
        </div>
      </AuthProvider>
    </PolybaseProvider>
    </>
  );
}

export default App;
