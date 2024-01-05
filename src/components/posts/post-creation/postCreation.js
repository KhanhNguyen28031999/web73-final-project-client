import { useState } from "react";
import "./style.css";
import axios from "axios";

const PostCreation = ({ setIsPostCreationVisible }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");

  // const handleSubmit = () => {
  //   if (!title || !content || !hashtags) {
  //     alert("Bạn chưa điền đầy đủ các trường !");
  //     return;
  //   } else {
  //     setTitle("");
  //     setHashtags("");
  //     setContent("");
  //     setIsVisible(false);
  //     setIsPostCreationVisible(false);
  //     handleCreatePost();
  //   }
  // };

  const handleCreatePost = () => {
    // handleSubmit();
    const newPost = {
      title: title,
      hashtags: hashtags,
      content: content,
    };
    axios.post("http://localhost:3001/posts", newPost).then(() => {
      console.log("Create newpost completed");
    });
    // axios
    //   .post("http://localhost:3001/posts", newPost)
    //   .then(() => {
    //     setTitle("");
    //     setHashtags("");
    //     setContent("");
    //     console.log("Create a new post successful");
    //   })
    //   .catch((error) => {
    //     console.log("API error:", error);
    //   });
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
      <input
        id="title"
        type="text"
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        id="content"
        placeholder="Bạn đang cảm thấy như thế nào ?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="bar-hashtags">
        <input
          id="hashtags"
          placeholder="#HashTags"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          required
        />
      </div>
      <button onClick={handleCreatePost}>Đăng bài viết</button>
    </div>
  );
};

export default PostCreation;
