import React from "react";
import { FaBell, FaEnvelope } from "react-icons/fa";
import "./style.css";
const Header = () => {
  return (
    <div className="header">
      <div className="logo">LOGO</div>
      <div className="actions"></div>

      <input placeholder="Search" className="search" />

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
