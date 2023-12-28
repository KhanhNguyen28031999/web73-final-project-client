import React, { useState, useEffect } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/auth/login";
import { Register, Login } from "./components/antdesigns/auth";
import Home from "./pages/home";

function App() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/auth/login");
  // }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
