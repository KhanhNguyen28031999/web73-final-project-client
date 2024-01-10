import React, { useState } from "react";
import axios from "axios";

const Comment = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/comments", {
        comment: comment,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <input
          placeholder="Bình luận ..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleSubmit}>Gửi</button>
      </div>
      <div>Danh sách bình luận</div>
    </div>
  );
};
export default Comment;
