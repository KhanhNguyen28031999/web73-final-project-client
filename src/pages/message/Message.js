import { Avatar, Button, Col, Divider, Flex, List, Row } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../header";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: <span>nav {index + 1}</span>,
}));
const { Content, Footer, Sider } = Layout;
function Message() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);

  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = (values) => {
    console.log("Finish:", values);
  };

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  return (
    <>
      {/* <Header />
      <Row>
        <Col span={18} push={6}>
          col-18 col-push-6
        </Col>
        <Col style={{ backgroundColor: "#d9d9d9" }} span={6} pull={18}>
          col-6 col-pull-18
        </Col>
      </Row> */}
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "#d9d9d9",
          }}
          theme="light"
        >
          <div className="demo-logo-vertical" />
          <Button style={{ fontSize: "18pt", height: "5vh", width: "100%" }}>
            Thêm
          </Button>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
            style={{
              backgroundColor: "#d9d9d9",
              fontSize: "18pt",
            }}
          />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "24px 16px 0 0", overflow: "initial" }}>
            <div
              style={{
                padding: 24,
                height: "82vh",
                //textAlign: "center",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Flex justify={"space-between"} style={{ marginBottom: "5vh" }}>
                <div style={{ width: "50%" }}>
                  <span
                    style={{
                      height: "auto",
                      border: "1px solid black",
                      display: "inline-block",
                      borderRadius: "5px",
                      paddingLeft: "8px",
                      fontSize: "16pt",
                      paddingRight: "8px",
                    }}
                  >
                    Ant Design, a design language for background applications,
                    is refined by Ant UED
                  </span>
                </div>
                <div></div>
              </Flex>
              <Flex justify={"space-between"} style={{ width: "100%" }}>
                <div></div>
                <div style={{ width: "50%" }}>
                  <span
                    style={{
                      height: "auto",
                      border: "1px solid black",
                      display: "inline-block",
                      borderRadius: "5px",
                      fontSize: "16pt",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    Ant Design, a design language for background applications,
                    is refined by Ant UED
                  </span>
                </div>
              </Flex>
            </div>
          </Content>
          <Footer style={{ textAlign: "center", marginTop: 0 }}>
            <Form
              style={{ width: "100%" }}
              size="large"
              form={form}
              name="horizontal_login"
              layout="inline"
              onFinish={onFinish}
            >
              <Form.Item
                style={{ width: "90%" }}
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="..."
                />
              </Form.Item>
              <Form.Item shouldUpdate style={{ width: "5%" }}>
                {() => (
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={
                      !clientReady ||
                      !form.isFieldsTouched(true) ||
                      !!form
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length
                    }
                  >
                    Gửi
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Message;
