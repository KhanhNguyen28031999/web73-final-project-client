import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Comment from "../postItem/comment";

function PostDetail({ username }) {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const { postId } = useParams();

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/comments/${postId}`
      );
      setComments(response.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [comments]);

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
          <p>
            Hashtag:{" "}
            {post.hashtags
              .split(",")
              .map((tag) => "#" + tag.trim())
              .join(" ")}
          </p>{" "}
          <button>Edit</button>
          <button>Delete</button>
          <div className="comment-section">
            <Comment postId={postId} />
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id}>
                  <p>{comment.author}</p>
                  <p>{comment.content}</p>
                </div>
              ))
            ) : (
              <div>Chưa có bình luận mới.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
