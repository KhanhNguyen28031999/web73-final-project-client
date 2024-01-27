import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "../style.css";
import { Card, Col, Row, Flex } from "antd";
import { Container } from "react-bootstrap";

const ProfileMain = ({ setPage }) => {
  const [temp, setTemp] = useState({});

  const [temp1, setTemp1] = useState([]);

  const [user, setUser] = useState({});

  const navigate = useNavigate();

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

  const handleSetPage = (key) => {
    setPage(key);
  };
  const loadData = () => {
    fetch("http://localhost:3001/users/stat", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTemp(res.data);
      });
    fetch(`http://localhost:3001/posts?author=${user._id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTemp1(res.data);
      });
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="profile-main">
      <Container>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <Card style={{ textAlign: "center" }}>
              <p>
                <b style={{ fontSize: "30pt" }}>
                  {temp.followers ? temp.followers : "0"}
                </b>
              </p>
              <p>Followers</p>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={{ textAlign: "center" }}>
              <p>
                <b style={{ fontSize: "30pt" }}>
                  {temp.posts ? temp.posts : "0"}
                </b>
              </p>
              <p>Posts</p>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={{ textAlign: "center" }}>
              <p>
                <b style={{ fontSize: "30pt" }}>
                  {temp.comments ? temp.comments : "0"}
                </b>
              </p>
              <p>Comments</p>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={{ textAlign: "center" }}>
              <p>
                <b style={{ fontSize: "30pt" }}>
                  {temp.reactions ? temp.reactions : "0"}
                </b>
              </p>
              <p>reactions</p>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <Flex justify={"space-between"} className="m-5">
          <h3>Bài viết bạn đã đăng : </h3>
        </Flex>
        <Row>
          {temp1.map((post, index) => {
            if (post.author._id === user._id) {
              return (
                <Card
                  key={index}
                  className="mb-3"
                  style={{ textAlign: "left", width: "100%", fontSize: "13pt" }}
                >
                  <p
                    className="recent-post"
                    onClick={() =>
                      navigate(`/posts/${post._id}`, {
                        state: { postdata: post },
                      })
                    }
                  >
                    {post.title}
                  </p>
                </Card>
              );
            }
            return "";
          })}
        </Row>
      </Container>
    </div>
  );
};

export default ProfileMain;
