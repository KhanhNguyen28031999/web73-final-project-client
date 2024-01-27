import React from "react";
import { useNavigate } from "react-router-dom";

import "../style.css";

const LeftBar = ({ recentPosts, user }) => {
  const navigate = useNavigate();
  return (
    <div className="leftbar">
      <div className="advertisement">
        Advertisement
        <img
          src="https://thuongtruong2-fileserver.nvcms.net/IMAGES/2021/05/27/2021052714534212shoppe_bbya.jpg"
          alt="Advertisement"
        />
      </div>

      <div className="recentpost">
        <p>Your recent post</p>
        <ul>
          {recentPosts?.map((recentPost) =>
            user._id === recentPost.author._id ? (
              <li
                className="title-leftbar"
                onClick={() =>
                  navigate(`/posts/${recentPost._id}`, {
                    state: { postdata: recentPost },
                  })
                }
                key={recentPost._id}
              >
                {recentPost.title}
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
};

export default LeftBar;
