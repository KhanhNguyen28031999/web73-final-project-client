import React from "react";
import "../style.css";
import { Card, Col, Row, Flex } from "antd";
import { Container } from "react-bootstrap";

const ProfileMain = () => {
  const a = [1, 2, 3];
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
            <Card>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <div className="profile-post">Your post</div> */}
      <Container>
        <Flex justify={"space-between"} className="m-5">
          <h3>Recent Posts</h3>
          <a href="#posts">View all {">>"}</a>
        </Flex>
        <Row>
          {a.map((el, index) => (
            <Card
              key={index}
              className="mb-3"
              style={{ textAlign: "left", width: "100%", fontSize: "13pt" }}
            >
              <p>Post 1</p>
              <p>
                <span className="me-5">20 Likes </span>
                <span>5 Comments</span>
              </p>
              <p>#Hashtag</p>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProfileMain;
