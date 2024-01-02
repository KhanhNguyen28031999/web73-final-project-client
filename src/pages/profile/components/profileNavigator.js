import React from "react";
import "../style.css";

const ProfileNavigator = () => {
  return (
    <div className="profile-navigator">
      <div className="profile-avatar">Your avatar</div>
      <div className="profile-information">
        <div>Your name</div>
        <div>Your address</div>
      </div>
      <div className="profile-navigation">
        <div>Your information</div>
        <br />
        <div>Following</div>
        <br />
        <div>Privacy</div>
        <br />
        <div>Change Password</div>
      </div>
    </div>
  );
};

export default ProfileNavigator;
