import React from "react";
import Header from "../header";
import "./style.css";
import ProfileMain from "./components/profileMain";
import ProfileNavigator from "./components/profileNavigator";

const Profile = () => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Header style={{ margin: 0, padding: 0 }} />
      <div className="body-profile">
        <div className="profiles-container">
          <ProfileNavigator />

          <ProfileMain />
        </div>
      </div>
    </div>
  );
};

export default Profile;
