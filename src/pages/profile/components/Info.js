import React from "react";
import { Card, Flex, message, Upload, Button, Avatar, Form, Input } from "antd";
import { Container } from "react-bootstrap";
import "../style.css";
import { UploadOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
const { TextArea } = Input;

function Info() {
  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div className="profile-main" style={{ textAlign: "center" }}>
      <Container>
        <Card>
          <Flex style={{ height: "15vh" }} align="flex-end" justify="flex-end">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Flex>
        </Card>
        <Avatar
          style={{ transform: "translateY(-100px)" }}
          size={{ xs: 32, sm: 64, md: 128, lg: 128, xl: 128, xxl: 256 }}
          icon={
            <img src="https://th.bing.com/th/id/OIP.NrKF5Z3xqRvxdPGgYjN7ggHaHa?w=151&h=180&c=7&r=0&o=5&dpr=2&pid=1.7" />
          }
        />
        <Flex
          style={{ transform: "translateY(-50px)" }}
          align="flex-start"
          justify="center"
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Flex>
        <Form layout="vertical">
          <Form.Item label="Name" required tooltip="This is a required field">
            <Input size="large" placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            label="Address"
            required
            tooltip={{
              title: "Tooltip with customize icon",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input size="large" placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Bio">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  );
}

export default Info;
