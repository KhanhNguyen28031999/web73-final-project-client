import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Header from "../header";
import "./style.css";
import { message } from "antd";

const ProfileId = () => {
  const [userData, setUserData] = useState(null);
  const [userStat, setUserStat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [follow, setFollow] = useState({});

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
  });

  const location = useLocation();
  const postdata = location.state?.postdata;

  const navigate = useNavigate();

  const { userId } = useParams();
  const _followingId = userId;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/auth/users/${postdata.author._id}`
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }; ///
    const fetchUserStat = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/stat/${postdata.author._id}`
        );
        const data = await response.json();
        setUserStat(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }; ///
    const fetchUserPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts`);
        const data = response.data.data;
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    if (postdata) {
      fetchUserPost();
      fetchUserData();
      fetchUserStat();
    }
    const followingStatus = localStorage.getItem("followingStatus");
    if (followingStatus) {
      const { followingId, followerId } = JSON.parse(followingStatus);
      if (followingId === _followingId && followerId === user._id) {
        setIsFollowing(true);
        setFollow({ follower: user._id });
      }
    }
  }, [postdata, _followingId, user._id]);

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/followers",
        {
          followingUserId: userData._id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const followingId = response.data.data.following;
      const followerId = response.data.data.follower;
      if (followingId === _followingId && followerId === user._id) {
        message.success("Followed Success !.");
        setIsFollowing(true);
        setFollow(response.data.data);
        localStorage.setItem(
          "followingStatus",
          JSON.stringify({ followingId, followerId })
        );
      } else {
        message.success("Follow successful.");
        setIsFollowing(false);
        setFollow({});
      }
    } catch (error) {
      console.error("Error following user:", error);
      message.error("Failed to follow user.");
    }
  };

  return (
    <div>
      <Header />
      {isLoading && <div>Loading user data...</div>}
      {userData && userStat && (
        <div className="profileid-main">
          <div className="profileid-main--image">
            <div
              className="image-cover"
              style={{
                backgroundImage: `url(${userData.background})`,
                padding: "16px",
                borderRadius: "8px",
              }}
            />
            <div
              className="image-avatar"
              style={{
                backgroundImage: `url(${userData.avatar})`,
                objectFit: "cover",
              }}
            />
          </div>
          <div className="profileid-main--inform">
            <div className="inform-name">{userData.username}</div>
            <div className="inform-phone">
              Phonenumber : {userData.phonenumber}
            </div>
          </div>
          <div className="profileid-data">
            <div>{userStat.posts} Posts</div>
            <div>{userStat.reactions} Reactions</div>
            <div>{userStat.followers} Followers</div>
          </div>
          <div className="profileid-interactive">
            <div onClick={handleFollow}>
              {isFollowing ? "Has Followed" : "+ Follow"}
            </div>
            <div>Message</div>
            <div>Block</div>
          </div>
          <div className="profileid-post">
            {posts && posts.length > 0 ? (
              posts
                .filter((post) => post.author._id === userData._id) // Filter posts by author
                .map((post) => (
                  <div className="post-profile" key={post._id}>
                    <h4>{post.title}</h4>
                    <p>
                      {post.content.slice(0, 100)}...
                      <span
                        className="postid-more"
                        onClick={() =>
                          navigate(`/posts/${post._id}`, {
                            state: { postdata: post },
                          })
                        }
                      >
                        xem thêm
                      </span>
                    </p>
                  </div>
                ))
            ) : (
              <div>No posts found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileId;
