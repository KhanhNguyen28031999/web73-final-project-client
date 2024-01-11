import React, { useState } from "react";
import { Card, Flex, message, Upload, Button, Avatar, Form, Input } from "antd";
import { Container } from "react-bootstrap";
import "../style.css";
import { UploadOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
const { TextArea } = Input;

function Password() {
  const [curpass, setCurpass] = useState("");
  const [newpass, setNewpass] = useState("");
  const changeInfo = () => {
    var data = new URLSearchParams();
    data.append("curpass", curpass);
    data.append("newpass", newpass);
    fetch("http://localhost:3001/users/password", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.check === true) {
          window.location.reload();
        }
      });
  };
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
            <Button onClick={() => changeInfo()} type="primary">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  );
}

export default Password;
