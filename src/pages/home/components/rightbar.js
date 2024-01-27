import React, { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";

import "../style.css";
import axios from "axios";

const RightBar = ({ currentUser }) => {
  const [users, setUsers] = useState([]);

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(
          "http://localhost:3001/auth/users"
        );
        const followersResponse = await axios.get(
          "http://localhost:3001/followers",
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setFollowers(followersResponse.data.data);
        setUsers(usersResponse.data);
        // setFollowers(followersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rightbar">
      RightBar
      <div className="calendar">
        <ReactCalendar className="custom-calendar" />
      </div>
      <div className="following">
        <p>Following List</p>
        <div>
          {followers.map((follower) => (
            <div key={follower._id}>
              <div>
                {follower.follower === currentUser._id && (
                  <div>
                    {users.map(
                      (user) =>
                        user._id === follower.following && (
                          <div className="follow-user" key={user._id}>
                            <img
                              src={user.avatar}
                              style={{ width: 30, height: 30 }}
                            />
                            <span>{user.username}</span>
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
