import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { FaPen } from "react-icons/fa";

import PostCreation from "../../../components/posts/post-creation/postCreation.js";
import PostItem from "../../../components/posts/postItem/index.js";
import Pagination from "../../../components/paginations/index.js";

const MainPage = () => {
  const [isPostCreationVisible, setIsPostCreationVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCreatePost = () => {
    setIsPostCreationVisible(!isPostCreationVisible);
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
      <button
        type="primary"
        className="create-post-button"
        title="Thêm bài viết"
        onClick={handleCreatePost}
      >
        <FaPen />
      </button>
      {isPostCreationVisible && (
        <PostCreation setIsPostCreationVisible={setIsPostCreationVisible} />
      )}
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
