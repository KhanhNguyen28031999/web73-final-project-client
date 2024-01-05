import React from "react";
import { FaBell, FaEnvelope } from "react-icons/fa";
//import { useNavigate } from "react-router-dom";
import "./style.css";
import { ButtonGroup, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Avatar } from "antd";
const Header = () => {
  // const navigate = useNavigate();

  return (
    // <div className="header">
    //   <div className="logo">LOGO</div>
    //   <input placeholder="Search" className="search" />
    //   <div className="actions">
    //     <p onClick={() => navigate("/home")}>Home</p>
    //     <p onClick={() => navigate("/profile")}>Profile</p>
    //   </div>
    //   <div className="notice">
    //     <FaBell color="white" />
    //   </div>
    //   <div className="message">
    //     <FaEnvelope color="white" />
    //   </div>
    //   <div className="profile-container">Username</div>
    //   <div>Logout</div>
    // </div>
    <Navbar
      style={{ fontSize: "18pt" }}
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
    >
      <Navbar.Brand className="m-3" href="/home">
        Mindx
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/home">Trang chủ</Nav.Link>
          <Nav.Link href="/profile">Trang cá nhân</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className="me-3" href="#features">
            <FaBell color="black" />
          </Nav.Link>
          <Nav.Link className="me-3" href="#pricing">
            <FaEnvelope color="black" />
          </Nav.Link>
          {/* <NavDropdown
            title={
              <Avatar
                size={30}
                icon={
                  <img src="https://th.bing.com/th/id/OIP.NrKF5Z3xqRvxdPGgYjN7ggHaHa?w=151&h=180&c=7&r=0&o=5&dpr=2&pid=1.7" />
                }
              />
            }
            id="collapsible-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.1">Thông tin</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Đăng xuất</NavDropdown.Item>
          </NavDropdown> */}
          <NavDropdown
            title={
              <Avatar
                size={30}
                icon={
                  <img src="https://th.bing.com/th/id/OIP.NrKF5Z3xqRvxdPGgYjN7ggHaHa?w=151&h=180&c=7&r=0&o=5&dpr=2&pid=1.7" />
                }
              />
            }
            as={ButtonGroup}
            key={"start"}
            align={{ lg: "end" }}
            id={`collapsible-nav-dropdown dropdown-button-drop-${"start"}`}
            variant="secondary"
          >
            <NavDropdown.Item href="#action/3.1">Thông tin</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Đăng xuất</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
