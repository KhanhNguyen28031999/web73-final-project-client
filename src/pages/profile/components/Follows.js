import { Button, Card, Col, Flex, Input, Row, Tooltip, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import { Container } from "react-bootstrap";

function Follows() {
  const [loading, setLoading] = useState(true);

  const onChange = (checked) => {
    setLoading(!checked);
  };
  const a = [1, 2, 3];
  return (
    <div className="profile-main">
      <Container>
        <Input size="large" className="mb-5" placeholder="Tìm kiếm posts" />
        <Row>
          <Col>
            <Flex justify={"space-between"}>
              <h3>Followers: 24</h3>
            </Flex>
            {a.map((el, index) => (
              <Row>
                <Card
                  className="mt-3 me-5"
                  hoverable
                  style={{ width: 620 }}
                  bodyStyle={{ padding: 0, overflow: "hidden" }}
                >
                  <Flex justify="">
                    <img
                      alt="avatar"
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      style={{ display: "block", width: 200 }}
                    />
                    <Flex
                      vertical
                      align="flex-start"
                      justify="space-between"
                      style={{ padding: 32 }}
                    >
                      <Typography.Title level={2}>User A</Typography.Title>
                      <Typography.Title level={3}>
                        <span className="me-5">10 posts</span>
                        <span> 2 followers</span>
                      </Typography.Title>
                    </Flex>
                  </Flex>
                </Card>
              </Row>
            ))}
          </Col>
          <Col>
            <Flex justify={"space-between"}>
              <h3>Followings: 24</h3>
            </Flex>
            {a.map((el, index) => (
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
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      style={{ display: "block", width: 200 }}
                    />
                    <Flex
                      vertical
                      align=""
                      justify="space-between"
                      style={{ width: 620, padding: 32 }}
                    >
                      <Flex align="center" justify="space-between">
                        <Typography.Title className="p-2" level={2}>
                          User A
                        </Typography.Title>

                        <Tooltip title="Hủy follow">
                          <Button shape="circle" size="large" danger>
                            x
                          </Button>
                        </Tooltip>
                      </Flex>
                      <Typography.Title level={3}>
                        <span className="me-5">10 posts</span>
                        <span> 2 followers</span>
                      </Typography.Title>
                    </Flex>
                  </Flex>
                </Card>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Follows;
