import React, { useEffect, useState } from "react";
import "../style.css";
import { UserOutlined } from "@ant-design/icons";
import { Divider, Menu, Avatar, Space } from "antd";
import axios from "axios";

const ProfileNavigator = ({ page, setPage }) => {
  const [temp, setTemp] = useState({});
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

  const items = [
    { label: "Profile", key: "1" },
    { label: "Follows", key: "2" },
    { label: "My info", key: "3" },
    // { label: "Privacy", key: "4" },
    { label: "Password", key: "4" },
  ];
  const handleSetPage = (key) => {
    setPage(key);
  };

  return (
    <div className="profile-navigator" style={{ textAlign: "center" }}>
      {/* <div className="profile-avatar">Your avatar</div> */}
      <div
        style={{
          backgroundImage: `url(${user.background})`,
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Space wrap size={16}>
          <Avatar
            size={{ xs: 32, sm: 64, md: 128, lg: 128, xl: 128, xxl: 256 }}
            icon={<img src={user.avatar} />}
          />
        </Space>
        <div className="profile-information" style={{ textAlign: "center" }}>
          <div className="profile-name">{user.username}</div>
          <div className="profile-phone">Phone : {user.phonenumber}</div>
          <div className="profile-gmail">Email : {user.email}</div>
        </div>
      </div>
      <Divider type="horizontal" />
      <br />
      <br />
      <Menu
        onClick={(e) => handleSetPage(e.key)}
        defaultSelectedKeys={[page]}
        style={{
          fontSize: "18pt",
        }}
        items={items}
      />
      {/* </div> */}
    </div>
  );
};

export default ProfileNavigator;
