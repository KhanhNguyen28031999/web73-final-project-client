import { Button, Card, Col, Flex, Input, Row, Tooltip, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";

import "../style.css";

const Follows = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);

  const handleUnFollow = async (followerId) => {
    try {
      await axios.delete(`http://localhost:3001/followers/${followerId}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      message.success("Huỷ theo dõi thành công !");
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(
          "http://localhost:3001/auth/users"
        );
        const followersResponse = await axios.get(
          "http://localhost:3001/followers",
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setFollowers(followersResponse.data.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [followers]);

  const followingCount = followers.filter(
    (follower) => follower.following === currentUser._id
  ).length;

  const followerCount = followers.filter(
    (follower) => follower.follower === currentUser._id
  ).length;
  return (
    <div className="profile-main">
      <Container>
        <Row className="profile-follow">
          <Col>
            <Flex justify={"space-between"}>
              <h3>Đang theo dõi : {followerCount} người</h3>
            </Flex>
            <div>
              {followers.map((follower) => (
                <div key={follower._id}>
                  <div>
                    {follower.follower === currentUser._id && (
                      <div>
                        {users.map(
                          (user) =>
                            user._id === follower.following && (
                              <Row>
                                <Card
                                  className="mt-3"
                                  hoverable
                                  style={{ width: 620 }}
                                  bodyStyle={{ padding: 0, overflow: "hidden" }}
                                >
                                  <Flex justify="">
                                    <img
                                      alt="avatar"
                                      src={user.avatar}
                                      style={{ display: "block", width: 200 }}
                                    />
                                    <Flex
                                      vertical
                                      align=""
                                      justify="space-between"
                                      style={{ width: 620, padding: 32 }}
                                    ></Flex>
                                    <Flex
                                      align="center"
                                      justify="space-between"
                                    >
                                      <Typography.Title
                                        className="p-2"
                                        level={2}
                                      >
                                        {user.username}
                                      </Typography.Title>

                                      <Tooltip title="Hủy follow">
                                        <Button
                                          className="unfollow-btn"
                                          shape="circle"
                                          size="large"
                                          danger
                                          onClick={() => {
                                            if (
                                              window.confirm(
                                                "Bạn chắc chắn muốn huỷ theo dõi người này ?"
                                              )
                                            ) {
                                              handleUnFollow(follower._id);
                                            }
                                          }}
                                        >
                                          x
                                        </Button>
                                      </Tooltip>
                                    </Flex>
                                  </Flex>
                                </Card>
                              </Row>
                            )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col className="profile-follow1">
            <Flex justify={"space-between"}>
              <h3>Người theo dõi : {followingCount} người</h3>
            </Flex>
            <div>
              {followers.map((follower) => (
                <div key={follower._id}>
                  <div>
                    {follower.following === currentUser._id && (
                      <div>
                        {users.map(
                          (user) =>
                            user._id === follower.follower && (
                              <Row>
                                <Card
                                  className="mt-3"
                                  hoverable
                                  style={{ width: 620 }}
                                  bodyStyle={{ padding: 0, overflow: "hidden" }}
                                >
                                  <Flex justify="">
                                    <img
                                      alt="avatar"
                                      src={user.avatar}
                                      style={{ display: "block", width: 200 }}
                                    />
                                    <Flex
                                      vertical
                                      align=""
                                      justify="space-between"
                                      style={{ width: 620, padding: 32 }}
                                    ></Flex>
                                    <Flex
                                      align="center"
                                      justify="space-between"
                                    >
                                      <Typography.Title
                                        className="p-2"
                                        level={2}
                                      >
                                        {user.username}
                                      </Typography.Title>
                                    </Flex>
                                  </Flex>
                                </Card>
                              </Row>
                            )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Follows;
