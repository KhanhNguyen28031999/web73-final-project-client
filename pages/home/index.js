import React from "react";
import { useState, useEffect } from "react";
// import Footer from "../footer";
import Header from "../header";
import axios from "axios";

import "./style.css";
import { FaPen } from "react-icons/fa";
import PostCreation from "../../components/posts/post-creation/postCreation";

const Home = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        setPosts(response.data.data);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const [isPostCreationVisible, setIsPostCreationVisible] = useState(false);
  const createPost = async (title, content, hashtags) => {
    const postData = await axios.post("http://localhost:3001/posts", {
      title,
      content,
      hashtags,
    });

    setPosts(
      posts.map((post) =>
        post.id === postData.data.id
          ? { ...post, hashtags: postData.data.hashtags.split(",") }
          : post
      )
    );
  };
  const toggleIsPostCreationVisible = () => {
    setIsPostCreationVisible(!isPostCreationVisible);
  };
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Header style={{ margin: 0, padding: 0 }} />
      {error && <div className="error-message">{error}</div>}
      <div className="home-page-body" style={{ margin: 0, padding: 0 }}>
        <div className="home-page-body">
          <div className="left-bar"> Trang Chủ</div>

          <div className="page-body">
            {isPostCreationVisible && (
              <PostCreation
                createPost={createPost}
                setPosts={setPosts}
                posts={posts}
                setIsPostCreationVisible={setIsPostCreationVisible}
              />
            )}
            <div>
              {posts.map((post, index) => (
                <div key={index}>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  <p>Hashtags: {post.hashtags.join(",")}</p>
                </div>
              ))}
            </div>
            <button
              type="primary"
              className="create-post-button"
              title="Thêm bài viết"
              onClick={toggleIsPostCreationVisible}
            >
              <FaPen />
            </button>
          </div>
          <div className="friends-list"> Friends List</div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
