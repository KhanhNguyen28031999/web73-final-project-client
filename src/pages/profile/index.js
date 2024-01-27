import React, { useState, useEffect } from "react";

import axios from "axios";
import Header from "../header";
import "./style.css";
import ProfileMain from "./components/profileMain";
import ProfileNavigator from "./components/profileNavigator";
import Follows from "./components/Follows";
import Info from "./components/Info";
import Privacy from "./components/Privacy";
import Password from "./components/Password";
const Profile = () => {
  const [page, setPage] = useState("1");
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

  let pageContent;

  switch (page) {
    case "1":
      pageContent = <ProfileMain setPage={setPage} />;
      break;
    case "2":
      pageContent = <Follows currentUser={user} />;
      break;
    case "3":
      pageContent = <Info currentUser={user} />;
      break;
    // case "4":
    //   pageContent = <Privacy />;
    //   break;
    case "4":
      pageContent = <Password currentUser={user} />;
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
