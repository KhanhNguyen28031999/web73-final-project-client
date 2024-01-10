import React, { useState } from "react";
import { Modal } from "antd";

import Comment from "./comment";
import PopOver from "./popover";
import "./style.css";

import PostDetail from "../post-detail";

const PostItem = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="post-item">
      <PopOver />
      <p onClick={handleModalOpen}>{post.title}</p>
      <p>{post.content}</p>
      <p>Author: {post.author.username}</p>
      <p>
        Hashtag:{" "}
        {post.hashtags
          .split(",")
          .map((tag) => "#" + tag.trim())
          .join(" ")}
      </p>{" "}
      {""}
      <div className="post-interface">
        <div className="post-reaction">Reaction</div>
        <div className="post-comment" onClick={handleModalOpen}>
          Comments
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        width={1000}
        closeIcon={null}
      >
        <div className="post-modal">
          <div className="post-menu">
            <PopOver />
          </div>
          <div>
            <p onClick={handleModalOpen}>{post.title}</p>
            <p>{post.content}</p>
            <p>Author: {post.author.username}</p>
            <p>
              Hashtag:{" "}
              {post.hashtags
                .split(",")
                .map((tag) => "#" + tag.trim())
                .join(" ")}
            </p>{" "}
            {""}
          </div>
          <div>
            <div>Like</div>
            <Comment />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PostItem;
