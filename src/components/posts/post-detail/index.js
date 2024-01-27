import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import axios from "axios";

import "./style.css";

import Comment from "../postItem/comment";
import ReactionItem from "../postItem/reactions";

const PostDetail = () => {
  const [post, setPost] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const [editComment, setEditComment] = useState("");
  const [isEditComment, setIsEditComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedHashtags, setUpdatedHashtags] = useState("");

  const [user, setUser] = useState({});

  const location = useLocation();
  const postdata = location.state?.postdata;

  const { postId } = useParams();

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
  }, [comments, post]);

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
  }, [postId]);

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

  // const handleEditComment = async (commentId) => {
  //   const newComment = {
  //     _id: commentId,
  //     author: user.username,
  //     content: editComment,
  //   };
  //   console.log("Sending comment update:", newComment);

  //   const response = await axios.put(
  //     `http://localhost:3001/comments/${commentId}`,
  //     newComment,
  //     {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     }
  //   );

  //   if (response.status === 201) {
  //     setComments((prevComments) => {
  //       return prevComments.map((comment) => {
  //         <li key={comment._id}>{comment.content}</li>;
  //         if (comment._id === commentId) {
  //           return response.data;
  //         } else {
  //           return comment;
  //         }
  //       });
  //     });
  //   } else {
  //     console.error("Error updating comment:", response);
  //     alert("Lỗi cập nhật bình luận. Vui lòng thử lại!");
  //   }
  // };

  return (
    <div className="post-detail">
      {isLoading ? (
        <h4>Loading ...</h4>
      ) : (
        <div className="post-detail__1">
          {isEditing ? (
            <div className="post-detail__2">
              <input
                placeholder="Tiêu đề"
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <textarea
                placeholder="Nội dung ..."
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
              <input
                placeholder="###Hashtags"
                type="text"
                value={updatedHashtags}
                onChange={(e) => setUpdatedHashtags(e.target.value)}
              />
              <div className="editpost-handle-button">
                <button onClick={handleSave}>Lưu</button>
                <button onClick={() => setIsEditing(false)}>Huỷ</button>
              </div>
            </div>
          ) : (
            <div className="post-detail__3">
              <button
                className="close-post-detail"
                onClick={() => navigate("/home")}
              >
                X
              </button>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p
                onClick={() => {
                  if (postdata.author._id === user._id) {
                    navigate("/profile");
                  } else {
                    navigate(`/profile/${postdata.author._id}`, {
                      state: { postdata: postdata },
                    });
                  }
                }}
              >
                Author:{" "}
                <span className="post-author">{postdata.author.username}</span>
              </p>
              <p>
                Hashtag:{" "}
                {post.hashtags
                  .split(",")
                  .map((tag) => "#" + tag.trim())
                  .join(" ")}
              </p>{" "}
              <button
                className={
                  user._id === post.author
                    ? "post-detail__3-button"
                    : "is-hidden"
                }
                onClick={() => setIsEditing(!isEditing)}
              >
                Edit
              </button>
              <button
                className={
                  user._id === post.author
                    ? "post-detail__3-button"
                    : "is-hidden"
                }
                onClick={() => {
                  if (window.confirm("Bạn chắc chắn muốn xóa bài viết này?")) {
                    handleDelete();
                  }
                }}
              >
                Xóa
              </button>
            </div>
          )}
          <ReactionItem postId={postId} />
          <div className="comment-section">
            <Comment postId={postId} comments={comments} />
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id}>
                  <div className="comment">
                    <div className="comment-avatar">
                      <img
                        src={user.avatar}
                        width={30}
                        height={30}
                        style={{
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div
                      onClick={() => {
                        if (comment.userId === user._id) {
                          navigate("/profile");
                        } else {
                          navigate(`/profile/${comment._userId}`, {
                            state: { postdata: comment },
                          });
                        }
                      }}
                      className="comment-author"
                    >
                      {comment.author} :{" "}
                    </div>
                    <div className="comment-content">{comment.content}</div>
                    {/* {isEditComment && editingCommentId === comment._id ? (
                      <div>
                        <input
                          type="text"
                          placeholder="Nội dung"
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                        ></input>
                        <button onClick={() => handleEditComment(comment._id)}>
                          Lưu
                        </button>
                        <button onClick={() => setIsEditComment(false)}>
                          Huỷ
                        </button>
                      </div>
                    ) : ( */}
                    <div className="post-detail__4">
                      <div>
                        {/* <button
                            className={
                              user.username ===   
                                ? "post-detail__4-button"
                                : "is-hidden"
                            }
                            onClick={() => {
                              setIsEditComment(true);
                              setEditingCommentId(comment._id);
                              setEditComment(comment.content);
                            }}
                          >
                            Sửa
                          </button> */}
                        <button
                          className={
                            user.username === comment.author
                              ? "post-detail__4-button"
                              : "is-hidden"
                          }
                          onClick={() => {
                            if (
                              window.confirm(
                                "Bạn chắc chắn muốn xóa bình luận này?"
                              )
                            ) {
                              handleDeleteComment(comment._id);
                            }
                          }}
                        >
                          Xoá
                        </button>
                      </div>
                    </div>
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
};

export default PostDetail;

/* <button
                          className={
                            user.username === comment.author
                              ? "post-detail__4-button"
                              : "is-hidden"
                          }
                          onClick={() => {
                            setIsEditComment(true);
                            setEditingComment(comment.content);
                          }}
                        ></button> */
