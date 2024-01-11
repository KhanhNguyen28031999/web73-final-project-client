import React, { useState, useEffect } from "react";
import axios from "axios";

const Comment = ({ postId }) => {
  const [content, setContent] = useState("");
  const handleSubmit = async () => {
    if (!content) {
      return;
    }
    const newComment = {
      postId,
      content: content,
    };
    try {
      await axios.post("http://localhost:3001/comments", newComment, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setContent("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  return (
    <div>
      <div>
        <input
          placeholder="Bình luận ..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleSubmit}>Gửi</button>
      </div>
    </div>
  );
};

export default Comment;
