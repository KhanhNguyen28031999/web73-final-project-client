import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { FaPen } from "react-icons/fa";
import { Modal } from "antd";

import "../style.css";

import PostCreation from "../../../components/posts/post-creation/postCreation.js";
import PostItem from "../../../components/posts/postItem/index.js";
import Pagination from "../../../components/paginations/index.js";
import LeftBar from "./leftbar.js";
import RightBar from "./rightbar.js";

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const showModal = () => {
    setIsModalOpen(true);
  };

  const packageSize = 5;
  const {
    data: postsData,
    isLoading,
    error,
  } = useQuery(["posts", currentPage], () =>
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
    <div className="body">
      <LeftBar recentPosts={postsData?.data} user={user} />
      <div className="mainbody">
        <button
          type="primary"
          className="create-post-button"
          onClick={showModal}
        >
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
            {postsData?.data.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </ul>
        </div>
        <Pagination
          page={currentPage}
          pageSize={packageSize}
          totalPages={postsData?.totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <RightBar currentUser={user} />
    </div>
  );
};

export default MainPage;
