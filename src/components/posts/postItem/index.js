import PopOver from "./popover";
import "./style.css";

const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <PopOver />
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      <p>Author: {post.author.username}</p>
      <p>
        Hashtag:{" "}
        {post.hashtags
          .split(",")
          .map((tag) => "#" + tag.trim())
          .join(" ")}
      </p>{" "}
      {""}
    </div>
  );
};

export default PostItem;
