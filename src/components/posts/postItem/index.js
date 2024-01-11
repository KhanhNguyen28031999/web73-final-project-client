import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PostDetail from "../post-detail";
import PopOver from "./popover";
import "./style.css";

const PostItem = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div className="post-item">
      <PopOver />
      <p
        onClick={() =>
          navigate(`/posts/${post._id}`, {
            state: { username: post.author.username },
          })
        }
      >
        {post.title}
      </p>
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
      <div className="post-interface">
        <div className="post-reaction">Reaction</div>
        <div className="post-comment">Comments</div>
      </div>
    </div>
  );
};

export default PostItem;
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleModalOpen = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="post-item">
//       <PopOver />
//       <p onClick={handleModalOpen}>{post.title}</p>
//       <p>{post.content}</p>
//       <p>Author: {post.author.username}</p>
//       <p>
//         Hashtag:{" "}
//         {post.hashtags
//           .split(",")
//           .map((tag) => "#" + tag.trim())
//           .join(" ")}
//       </p>{" "}
//       {""}
//       <div className="post-interface">
//         <div className="post-reaction">Reaction</div>
//         <div className="post-comment" onClick={handleModalOpen}>
//           Comments
//         </div>
//       </div>
//       <Modal
//         open={isModalOpen}
//         onOk={handleModalClose}
//         onCancel={handleModalClose}
//         width={1000}
//         closeIcon={null}
//       >
//         <div className="post-modal">
//           <div className="post-menu">
//             <PopOver />
//           </div>
//           <div>
//             <p onClick={handleModalOpen}>{post.title}</p>
//             <p>{post.content}</p>
//             <p>Author: {post.author.username}</p>
//             <p>
//               Hashtag:{" "}
//               {post.hashtags
//                 .split(",")
//                 .map((tag) => "#" + tag.trim())
//                 .join(" ")}
//             </p>{" "}
//             {""}
//           </div>
//           <div>
//             <div>Like</div>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };
