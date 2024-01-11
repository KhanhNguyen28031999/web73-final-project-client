import React, { useEffect, useState } from "react";
import "../style.css";
import { Card, Col, Row, Flex } from "antd";
import { Container } from "react-bootstrap";

const ProfileMain = ({ setPage }) => {
  const a = [0, 1, 2];
  const [temp, setTemp] = useState({});
  const [temp1, setTemp1] = useState([]);
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
    fetch("http://localhost:3001/posts", {
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
      {/* <div className="profile-status">
        <div>Box 1</div>
        <div>Box 2</div>
        <div>Box 3</div>
        <div>Box 4</div>
      </div> */}
      <Container>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <Card style={{ textAlign: "center" }}>
              <p>
                <b style={{ fontSize: "30pt" }}>
                  {temp.followers ? temp.followers : "Loading"}
                </b>
              </p>
              <p>followers</p>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={{ textAlign: "center" }}>
              <p>
                <b style={{ fontSize: "30pt" }}>
                  {temp.posts ? temp.posts : "Loading"}
                </b>
              </p>
              <p>posts</p>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={{ textAlign: "center" }}>
              <p>
                <b style={{ fontSize: "30pt" }}>
                  {temp.result ? temp.result.countComment.length : "Loading"}
                </b>
              </p>
              <p>comments</p>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={{ textAlign: "center" }}>
              <p>
                <b style={{ fontSize: "30pt" }}>
                  {temp.result ? temp.result.countReaction.length : "Loading"}
                </b>
              </p>
              <p>reactions</p>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <div className="profile-post">Your post</div> */}
      <Container>
        <Flex justify={"space-between"} className="m-5">
          <h3>Recent Posts</h3>
          <span href="" onClick={(e) => handleSetPage("2")}>
            View all {">>"}
          </span>
        </Flex>
        <Row>
          {a.map((el, index) => (
            <Card
              key={index}
              className="mb-3"
              style={{ textAlign: "left", width: "100%", fontSize: "13pt" }}
            >
              <p>{temp1[index] ? temp1[index].title : "Loading"}</p>
              <p>
                <span className="me-5">20 Likes </span>
                <span>5 Comments</span>
              </p>
              <p>{temp1[index] ? temp1[index].hashtags : "Loading"}</p>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProfileMain;
