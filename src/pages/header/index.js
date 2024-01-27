import React, { useEffect, useState } from "react";
import { FaBell, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { ButtonGroup, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Avatar, message } from "antd";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
          const response = await axios.get(`http://localhost:3001/auth/me`, {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const userData = response.data.user;
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    message.success("Đăng xuất thành công !");
    setTimeout(() => {
      navigate("/auth/login");
    }, 1000);
  };
  return (
    <div className="header">
      <Navbar
        style={{ fontSize: "16pt" }}
        collapseOnSelect
        expand="lg"
        className="navbar-menu"
      >
        <div>
          <span className="logo">Mind</span>
          <span className="X">X</span>
        </div>
        <input placeholder="Search" className="search" />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">
              <span className="menu111">Home</span>
            </Nav.Link>
            <Nav.Link href="/profile">
              <span className="menu111">Profile</span>
            </Nav.Link>
          </Nav>
          <Nav>
            <div className="notice">
              <Nav.Link className="me-3" href="/notification">
                <FaBell color="white" />
              </Nav.Link>
            </div>
            <div className="message">
              <Nav.Link className="me-3" href="/message">
                <FaEnvelope color="white" />
              </Nav.Link>
            </div>
            <div>
              <span className="name">{user.username}</span>
              <NavDropdown
                title={
                  <Avatar size={30} icon={<img src={user.avatar} alt="" />} />
                }
                as={ButtonGroup}
                key={"start"}
                align={{ lg: "end" }}
                id={`collapsible-nav-dropdown dropdown-button-drop-${"start"}`}
                variant="secondary"
              >
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut}>Đăng xuất</NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default Header;
