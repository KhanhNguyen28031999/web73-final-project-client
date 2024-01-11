import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./style.css";

import Comment from "../postItem/comment";

function PostDetail() {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedHashtags, setUpdatedHashtags] = useState("");

  const [editingCommentId, setEditingCommentId] = useState("");
  const [editingComment, setEditingComment] = useState("");

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

  const handleSave = async () => {
    try {
      const updatePost = {
        title: updatedTitle,
        content: updatedContent,
        hashtags: updatedHashtags,
      };
      const response = await axios.put(
        `http://localhost:3001/posts/${postId}`,
        updatePost,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Post updated successfully:", response.data.data);
      setPost(response.data.data);

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Lỗi cập nhật bài viết. Vui lòng thử lại!");
    }
  };

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/posts/${postId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Post deleted successfully:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Lỗi xóa bài viết. Vui lòng thử lại!");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/comments/${commentId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Comment deleted successfully:", response.data);

      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Lỗi xóa bình luận. Vui lòng thử lại!");
    }
  };

  const handleSaveComment = async (event) => {
    event.preventDefault();

    const updatedContent = event.target.value;

    if (updatedContent === editingComment.content) {
      // Bình luận không thay đổi
      return;
    }

    const updateComment = {
      content: updatedContent,
    };

    const response = await axios.put(
      `http://localhost:3001/comments/${editingCommentId}`,
      updateComment,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    console.log("Comment updated successfully:", response.data.data);

    setEditingCommentId("");
    fetchComments();
  };

  return (
    <div className="post-detail">
      {isLoading ? (
        <h4>Loading ...</h4>
      ) : (
        <div className="post-detail__1">
          <h2>Post Detail</h2>
          {isEditing ? (
            <div className="post-detail__2">
              <input
                placeholder="Title"
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <textarea
                placeholder="Content"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
              <input
                placeholder="hashtags"
                type="text"
                value={updatedHashtags}
                onChange={(e) => setUpdatedHashtags(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div className="post-detail__3">
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
              <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
          <div className="comment-section">
            <Comment postId={postId} />
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id}>
                  <div className="comment">
                    <p>{comment.author}</p>
                    <p>{comment.content}</p>
                    {editingCommentId === comment._id ? (
                      <form onSubmit={handleSaveComment}>
                        <div className="form-group">
                          <label htmlFor="content">Nội dung</label>
                          <textarea
                            id="content"
                            name="content"
                            className="form-control"
                            value={editingComment.content}
                            onChange={(e) =>
                              setEditingComment({
                                ...editingComment,
                                content: e.target.value,
                              })
                            }
                          />
                        </div>
                        <button type="submit">Lưu</button>
                      </form>
                    ) : (
                      <div className="post-detail__4">
                        {/* <button
                          onClick={() => setEditingCommentId(comment._id)}
                        >
                          Edit
                        </button> */}
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="nocomment">Chưa có bình luận mới.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
