import React, { useEffect, useState } from "react";
import { Card, Col, Row, Flex, Pagination, Input } from "antd";
import { Container } from "react-bootstrap";
import "../style.css";
function Posts() {
  const [temp, setTemp] = useState([]);
  const loadData = () => {
    fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTemp(res.data);
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="profile-main">
      <Container>
        <Input size="large" placeholder="Tìm kiếm posts" />
        <Flex justify={"space-between"} className="mt-5">
          <h3>{temp ? "Total: " + temp.length + " posts" : "Loading"}</h3>
        </Flex>
        <Row>
          {temp.length > 0 &&
            temp.map((el, index) => (
              <Card
                key={index}
                className="mb-3"
                style={{ textAlign: "left", width: "100%", fontSize: "13pt" }}
              >
                <p>{el.title}</p>
                <p>
                  <span className="me-5">20 Likes </span>
                  <span>5 Comments</span>
                </p>
                <p>{el.hashtags}</p>
              </Card>
            ))}
          <Flex justifyContent="flex-end">
            <Pagination defaultCurrent={1} total={Number(temp.length / 5)} />
          </Flex>
        </Row>
      </Container>
    </div>
  );
}

export default Posts;
