import React, { useState } from "react";
import "../style.css";
import { UserOutlined } from "@ant-design/icons";
import { Divider, Menu, Avatar, Space } from "antd";

const ProfileNavigator = ({ page, setPage }) => {
  const items = [
    { label: "Profile", key: "1" },
    { label: "Posts", key: "2" },
    { label: "Follows", key: "3" },
    { label: "My info", key: "4" },
    { label: "Privacy", key: "5" },
    { label: "Password", key: "6" },
  ];
  const handleSetPage = (key) => {
    setPage(key);
  };
  return (
    <div className="profile-navigator" style={{ textAlign: "center" }}>
      {/* <div className="profile-avatar">Your avatar</div> */}
      <Space wrap size={16}>
        <Avatar
          size={{ xs: 32, sm: 64, md: 128, lg: 128, xl: 128, xxl: 256 }}
          icon={
            <img src="https://th.bing.com/th/id/OIP.NrKF5Z3xqRvxdPGgYjN7ggHaHa?w=151&h=180&c=7&r=0&o=5&dpr=2&pid=1.7" />
          }
        />
      </Space>
      <div className="profile-information" style={{ textAlign: "center" }}>
        <div>Your name</div>
        <div>Your address</div>
      </div>
      {/* <div className="profile-navigation"> */}
      {/* <div>Your information</div>
        <br />
        <div>Following</div>
        <br />
        <div>Privacy</div>
        <br />
        <div>Change Password</div> */}
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
