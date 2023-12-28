import { useState } from "react";
import "./style.css";

const PostCreation = ({
  createPost,
  setPosts,
  posts,
  setIsPostCreationVisible,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [postsLocal, setPostsLocal] = useState([]);
  let titleInput;
  let contentInput;
  let hashtagsInput;
  const handleSubmit = () => {
    const title = titleInput.value;
    const content = contentInput.value;
    const hashtags = hashtagsInput.value;
    setPostsLocal([...posts, { title, content, hashtags }]);
    createPost(title, content, hashtags);
    setIsVisible(false);
    setPosts([...posts, { title, content, hashtags }]);
  };
  return (
    <div className="post-creation" style={isVisible ? {} : { display: "none" }}>
      <span
        className="close-button"
        onClick={() => setIsPostCreationVisible(false)}
      >
        X
      </span>
      <h4>Hãy đăng tải trạng thái của bạn</h4>
      <input placeholder="Tiêu đề" ref={(input) => (titleInput = input)} />
      <textarea
        placeholder="Bạn đang cảm thấy như thế nào ?"
        ref={(input) => (contentInput = input)}
      />
      <div className="bar-hashtags">
        <input
          placeholder="HashTags#"
          ref={(input) => (hashtagsInput = input)}
        />
      </div>
      <button onClick={handleSubmit}>Đăng bài viết</button>
    </div>
  );
};

export default PostCreation;
