import React from "react";
import { FaBell, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./style.css";
const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="logo">LOGO</div>
      <input placeholder="Search" className="search" />
      <div className="actions">
        <p onClick={() => navigate("/home")}>Home</p>
        <p onClick={() => navigate("/profile")}>Profile</p>
      </div>
      <div className="notice">
        <FaBell color="white" />
      </div>
      <div className="message">
        <FaEnvelope color="white" />
      </div>
      <div className="profile-container">Username</div>
      <div>Logout</div>
    </div>
  );
};
export default Header;
