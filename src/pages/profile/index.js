import React, { useState } from "react";
import Header from "../header";
import "./style.css";
import ProfileMain from "./components/profileMain";
import ProfileNavigator from "./components/profileNavigator";
import Posts from "./components/Posts";
import Follows from "./components/Follows";
import Info from "./components/Info";
import Privacy from "./components/Privacy";
import Password from "./components/Password";
const Profile = () => {
  const [page, setPage] = useState("1");
  let pageContent;

  switch (page) {
    case "1":
      pageContent = <ProfileMain setPage={setPage} />;
      break;

    case "2":
      pageContent = <Posts />;
      break;
    case "3":
      pageContent = <Follows />;
      break;
    case "4":
      pageContent = <Info />;
      break;
    case "5":
      pageContent = <Privacy />;
      break;
    case "6":
      pageContent = <Password />;
      break;
    default:
      pageContent = null; // Handle unexpected page values
  }
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Header style={{ margin: 0, padding: 0 }} />
      <div className="body-profile">
        <div className="profiles-container">
          <ProfileNavigator page={page} setPage={setPage} />
          {pageContent}
        </div>
      </div>
    </div>
  );
};

export default Profile;
