import React, { useState } from "react";
import { Card, Flex, message, Upload, Button, Avatar, Form, Input } from "antd";
import { Container } from "react-bootstrap";

import axios from "axios";
import "../style.css";
import { UploadOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";

function Info({ currentUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
  const changeInfo = async () => {
    let dataEdit = {
      username: name,
      email: email,
      phonenumber: phone,
    };
    try {
      const response = await axios.put(
        `http://localhost:3001/auth/users/${currentUser._id}`,
        dataEdit,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const result = response.data;
      message.success("Thay đổi thông tin thành công !");
      console.log(result);
      window.location.reload();
      // You can add a setState or other logic here to reflect the successful update in your component
    } catch (error) {
      console.error("Error updating user info:", error);
      message.error("Failed to update user info.");
    }
  };

  return (
    <div className="profile-main" style={{ textAlign: "center" }}>
      <Container>
        {/* <Card>
          <Flex style={{ height: "15vh" }} align="flex-end" justify="flex-end">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Flex>
        </Card>
        <Avatar
          style={{ transform: "translateY(-100px)" }}
          size={{
            xs: 32,
            sm: 64,
            md: 128,
            lg: 128,
            xl: 128,
            xxl: 256,
          }}
          icon={<img src={currentUser.avatar} />}
        />
        <Flex
          style={{ transform: "translateY(-50px)" }}
          align="flex-start"
          justify="center"
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Flex> */}
        <Form layout="vertical">
          <Form.Item label="Name" required tooltip="This is a required field">
            <Input
              size="large"
              onChange={(e) => setName(e.target.value)}
              placeholder="input placeholder"
              value={name}
            />
          </Form.Item>
          <Form.Item label="Email" required tooltip="This is a required field">
            <Input
              size="large"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="input placeholder"
              value={email}
            />
          </Form.Item>
          <Form.Item
            label="Phone number"
            required
            tooltip="This is a required field"
          >
            <Input
              size="large"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="input placeholder"
              value={phone}
            />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => changeInfo(name, email, phone)}
              size="large"
              type="primary"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  );
}

export default Info;
