import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { FaPen } from "react-icons/fa";
import { Modal } from "antd";

import "../style.css";

import PostCreation from "../../../components/posts/post-creation/postCreation.js";
import PostItem from "../../../components/posts/postItem/index.js";
import Pagination from "../../../components/paginations/index.js";

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const packageSize = 5;
  const { data, isLoading, error } = useQuery(["posts", currentPage], () =>
    axios
      .get(
        `http://localhost:3001/posts?page=${currentPage}&pageSize=${packageSize}`
      )
      .then((response) => response.data)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching posts: {error.message}</p>;
  }

  return (
    <div>
      <button type="primary" className="create-post-button" onClick={showModal}>
        <FaPen />
      </button>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <PostCreation setIsModalOpen={setIsModalOpen} />
      </Modal>
      <div className="posts-container">
        <ul>
          {data.data.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </ul>
      </div>
      <Pagination
        page={currentPage}
        pageSize={packageSize}
        totalPages={data.totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MainPage;
