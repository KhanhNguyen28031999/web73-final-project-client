import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
//login

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        values
      );
      if (response.status === 201) {
        message.success("Đăng nhập thành công!");
        localStorage.setItem("token", response.data.data.token);
        form.setFieldsValue({
          username: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      message.error("Sai tài khoản hoặc mật khẩu!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("An error occured:", errorInfo);
  };
  return (
    <div className="auth-page">
      <div className="auth-page-name">
        <h1>Welcome to Blog.Mindx.Project !</h1>
      </div>
      <div className="form-login">
        <div className="form-login-text">
          <p>Đăng nhập</p>
        </div>
        <div className="form-login-input">
          <Form
            className="form-auth"
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 350 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input className="form" placeholder="Enter your username ..." />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                className="form"
                placeholder="Enter your password ..."
              />
            </Form.Item>
            <br />
            <p className="text2">
              Haven't registered yet ?{" "}
              <a className="text3" onClick={() => navigate("/auth/register")}>
                Register now !
              </a>
            </p>
            <Form.Item wrapperCol={{ offset: 6, span: 8 }}>
              <Button className="button-form" type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
// Register;

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        values
      );

      if (response.status === 201) {
        message.success("Đăng ký thành công!");
        setTimeout(() => {
          message.info(
            "Bạn sẽ được chuyển hướng về trang đăng nhập sau 3 giây..."
          );
          setTimeout(() => navigate("/auth/login"), 3000);
        }, 2000);
      }
    } catch (error) {
      message.error("Lỗi hệ thống, vui lòng thử lại sau!");
      console.error(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.error("Lỗi form:", errorInfo);
  };
  return (
    <div>
      <div className="auth-page-name">
        <h1>Welcome to Blog.Mindx.Project !</h1>
      </div>
      <div className="form-login">
        <div className="form-login-text">
          <p>Register</p>
        </div>
        <div className="form-login-input">
          <Form
            className="form-auth"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 350 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input className="form" placeholder="Enter your username ..." />
            </Form.Item>
            {/* Email register  */}
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input className="form" placeholder="Enter your email ..." />
            </Form.Item>
            {/*Phone number registering */}
            <Form.Item
              name="phonenumber"
              rules={[
                {
                  required: true,
                  message: "Your phone number are invalid !",
                  pattern: /^[0-9]{10,11}$/,
                },
              ]}
            >
              <Input
                className="form"
                placeholder="Enter your phone number ..."
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                className="form"
                placeholder="Enter your password ..."
              />
            </Form.Item>
            {/* Confirm Password */}
            <Form.Item
              name="confirmpassword"
              rules={[
                { required: true, message: "Please confirm your password." },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    const password = getFieldValue("password");
                    if (!value || value !== password) {
                      return Promise.reject(
                        "Your confirm password isn't match !"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password
                className="form"
                placeholder="Confirm your password ..."
              />
            </Form.Item>
            <br />
            <p className="text2">
              Have an account already ?{" "}
              <a className="text3" onClick={() => navigate("/auth/login")}>
                Login now !
              </a>
            </p>
            <Form.Item wrapperCol={{ offset: 6, span: 8 }}>
              <Button className="button-form" type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export { Login, Register };
