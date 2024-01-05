import React from "react";
import { Card, Col, Row, Flex, Pagination, Input } from "antd";
import { Container } from "react-bootstrap";
import "../style.css";
function Posts() {
  const a = [1, 2, 3];
  return (
    <div className="profile-main">
      <Container>
        <Input size="large" placeholder="Tìm kiếm posts" />
        <Flex justify={"space-between"} className="mt-5">
          <h3>Total: 14 posts</h3>
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
          <Flex justifyContent="flex-end">
            <Pagination defaultCurrent={1} total={50} />
          </Flex>
        </Row>
      </Container>
    </div>
  );
}

export default Posts;
