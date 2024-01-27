import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./style.css";

const PostItem = ({ post }) => {
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
  return (
    <div className="post-item">
      <div
        onClick={() =>
          navigate(`/posts/${post._id}`, {
            state: { postdata: post },
          })
        }
        className="post-title"
      >
        {post.title}
      </div>
      <div className="post-content">{post.content}</div>
      <div
        className="post-author"
        onClick={() => {
          if (post.author._id === user._id) {
            navigate("/profile");
          } else {
            navigate(`/profile/${post.author._id}`, {
              state: { postdata: post },
            });
          }
        }}
      >
        Author: {post.author.username}
      </div>
      <div className="post-hastags">
        Hashtag:{" "}
        {post.hashtags
          .split(",")
          .map((tag) => "#" + tag.trim())
          .join(" ")}
      </div>{" "}
      {""}
      <div className="post-interface">
        <div className="post-reaction">Likes</div>
        <div
          onClick={() =>
            navigate(`/posts/${post._id}`, {
              state: { postdata: post },
            })
          }
          className="post-comment"
        >
          Comments
        </div>
      </div>
    </div>
  );
};

export default PostItem;
