import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPostDetail = () => {
      axios
        .get(`http://localhost:3001/posts/${postId}`)
        .then((res) => {
          setPost(res.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };
    getPostDetail();
  }, []);

  return (
    <div className="post-detail">
      {isLoading ? (
        <h4>Loading ...</h4>
      ) : (
        <div>
          <h2>Post Detail</h2>
          <h3>Title: {post.title}</h3>
          <p>{post.content}</p>
          <p>Author: {post.author}</p>
          <p>Hashtag: {post.hashtags ? `#${post.hashtags.join("#")}` : ""}</p>

          <button>Edit</button>
          <button>Delete</button>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
