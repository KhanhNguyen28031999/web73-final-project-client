import React from "react";
import {
  Card,
  Flex,
  message,
  Upload,
  Button,
  Avatar,
  Form,
  Input,
  Divider,
  Row,
  Typography,
  Col,
  Tooltip,
} from "antd";
import { Container } from "react-bootstrap";
import "../style.css";
import { Select, Space } from "antd";
import Link from "antd/es/typography/Link";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
function Privacy() {
  const a = [1, 2, 3];
  return (
    <div className="profile-main">
      <Container style={{ fontSize: "20pt" }}>
        <Flex className="mt-5" justify={"space-between"} align={"flex-start"}>
          Who can view my profile?
          <Select
            defaultValue="everyone"
            style={{ width: 200, height: 50 }}
            onChange={handleChange}
            options={[
              { value: "everyone", label: "Everyone" },
              { value: "onlyme", label: "Only me" },
              { value: "friend", label: "Friend" },
              { value: "fof", label: "Friend of Friend" },
            ]}
          />
        </Flex>
        <Flex className="mt-5" justify={"space-between"} align={"flex-start"}>
          Who can like/comment/share my post(s)?
          <Select
            defaultValue="everyone"
            style={{ width: 200, height: 50 }}
            onChange={handleChange}
            options={[
              { value: "everyone", label: "Everyone" },
              { value: "onlyme", label: "Only me" },
              { value: "friend", label: "Friend" },
              { value: "fof", label: "Friend of Friend" },
            ]}
          />
        </Flex>
        <Divider></Divider>
        <Flex justify={"space-between"}>
          <h3>Block user: 24</h3>
        </Flex>
        <Row>
          {a.map((el, index) => (
            <Col span={12}>
              <Card
                className="mt-3 me-5"
                hoverable
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

                      <Button shape="round" size="large" danger>
                        Unblock
                      </Button>
                    </Flex>
                    <Typography.Title level={3}>
                      <span className="me-5">10 posts</span>
                      <span> 2 followers</span>
                    </Typography.Title>
                  </Flex>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
        <div>
          <Link style={{ fontSize: "20pt" }}>Load more</Link>
        </div>
      </Container>
    </div>
  );
}

export default Privacy;
