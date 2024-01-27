import React, { useState } from "react";
import { Card, Flex, message, Upload, Button, Avatar, Form, Input } from "antd";
import { Container } from "react-bootstrap";
import "../style.css";
import { UploadOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
import axios from "axios";

function Password({ currentUser }) {
  const [curpass, setCurpass] = useState("");
  const [newpass, setNewpass] = useState("");

  const changeInfo = async () => {
    try {
      let data = {
        password: newpass,
      };
      const response = await axios.put(
        `http://localhost:3001/auth/users/${currentUser._id}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const result = response.data;
      message.success("Thay đổi mật khẩu thành công !");
      console.log(result);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="profile-main">
      <Container>
        <Form layout="vertical">
          <Form.Item
            label="Current password"
            required
            tooltip="This is a required field"
          >
            <Input.Password
              size="large"
              type="password"
              onChange={(e) => setCurpass(e.target.value)}
              placeholder="large size"
              value={curpass}
            />
          </Form.Item>
          <Form.Item
            label="New password"
            required
            tooltip={{
              title: "Tooltip with customize icon",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input.Password
              size="large"
              type="password"
              placeholder="large size"
              onChange={(e) => setNewpass(e.target.value)}
              value={newpass}
            />
          </Form.Item>
          <Form.Item
            label="Confirm password"
            required
            tooltip="This is a required field"
          >
            <Input.Password
              size="large"
              type="password"
              placeholder="large size"
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={changeInfo} type="primary">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  );
}

export default Password;
