import { useEffect, useState } from "react";
import axios from "axios";
import { Button, message } from "antd";
import { FaThumbsUp, FaAngry, FaSadCry, FaHeart } from "react-icons/fa";
import "./style.css";

const ReactionItem = ({ postId }) => {
  const [user, setUser] = useState({});
  const [reactionStats, setReactionStats] = useState({
    totalReactions: 0,
    reactionCounts: {},
  });

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

  useEffect(() => {
    const fetchReactionStats = async () => {
      try {
        const reactionStatsResponse = await axios.get(
          `http://localhost:3001/reactions/${postId}`
        );
        setReactionStats(reactionStatsResponse.data.data);
      } catch (error) {
        console.error("Error fetching reaction stats:", error);
      }
    };

    fetchReactionStats();
  }, [reactionStats]);

  const handleReaction = async (reactionType) => {
    try {
      // Call the backend API to handle the reaction
      await axios.post(`http://localhost:3001/reactions/${postId}`, {
        userId: user._id, // Replace with the actual user ID (you may need to get it from authentication)
        reactionType,
      });
    } catch (error) {
      console.error("Error handling reaction:", error);
      message.error("Failed");
    }
  };

  return (
    <div className="reactions-container">
      <div className="reactions-item-container">
        <div className="reactions-item me-3">
          <Button
            className="reactions-button"
            onClick={() => handleReaction("like")}
            title="Like"
          >
            <FaThumbsUp color="blue" size={30} />
          </Button>
          <div className="reaction-content">
            {reactionStats.reactionCounts.like}
          </div>
        </div>
        <div className="reactions-item me-3">
          <Button
            className="reactions-button"
            onClick={() => handleReaction("heart")}
            title="Heart"
          >
            <FaHeart color="red" size={30} />
          </Button>
          <div className="reaction-content">
            {reactionStats.reactionCounts.heart}
          </div>
        </div>
        <div className="reactions-item me-3">
          <Button
            className="reactions-button"
            onClick={() => handleReaction("sad")}
            title="Sad"
          >
            <FaSadCry color="orange" size={30} />
          </Button>
          <div className="reaction-content">
            {reactionStats.reactionCounts.sad}
          </div>
        </div>
        <div className="reactions-item me-3">
          <Button
            className="reactions-button"
            onClick={() => handleReaction("angry")}
            title="Angry"
          >
            <FaAngry color="brown" size={30} />
          </Button>
          <div className="reaction-content">
            {reactionStats.reactionCounts.angry}
          </div>
        </div>
        <div className="reactions-item me-3">
          <Button
            className="reactions-button"
            onClick={() => handleReaction("X")}
            title="Cancel"
          >
            <span>X</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReactionItem;
