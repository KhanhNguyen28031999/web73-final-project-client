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
// const items = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   AppstoreOutlined,
//   TeamOutlined,
//   ShopOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: <span>nav {index + 1}</span>,
// }));
const { Content, Footer, Sider } = Layout;
function Message() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [items, setItems] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [message, setMessage] = useState([]);
  const [x, setX] = useState(false);
  const [mes, setMes] = useState("");
  const handleSetX = () => {
    setX(true);
    fetch("http://localhost:3001/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setListUser(res.data);
      });
  };
  const handleCancel = () => {
    setX(false);
  };
  const handleMessage = (id) => {
    localStorage.setItem("user", id);
    fetch("http://localhost:3001/messages?receiver=" + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.data);
      });
  };
  const loadFollower = () => {
    fetch("http://localhost:3001/followers", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const temp = res.data.map((el) => ({
          key: el._id,
          label: (
            <span onClick={() => handleMessage(el._id)}>{el.to.name}</span>
          ),
        }));
        setItems(temp);
      });
  };
  const addFollower = (id) => {
    fetch("http://localhost:3001/followers/follower", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        to: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        loadFollower();
        handleCancel();
      });
  };
  const addChat = () => {
    if (mes !== "") {
      var data = new URLSearchParams();
      data.append("receiver", localStorage.getItem("user"));
      data.append("content", mes);
      return fetch("http://localhost:3001/messages/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.check === true) {
            setMes("");
            handleMessage(localStorage.getItem("user"));
          }
        });
    }
  };
  const chat =
    message.length > 0 &&
    message.map((el) => (
      <>
        {el._id !== localStorage.getItem("user") ? (
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
                {el.content}
              </span>
            </div>
            <div></div>
          </Flex>
        ) : (
          <Flex justify={"space-between"} style={{ width: "100%" }}>
            <div></div>
            <div style={{ textAlign: "right", width: "50%" }}>
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
                {el.content}
              </span>
            </div>
          </Flex>
        )}
      </>
    ));
  useEffect(() => {
    loadFollower();
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
          {x === false ? (
            <Button
              onClick={handleSetX}
              style={{ fontSize: "18pt", height: "5vh", width: "100%" }}
            >
              Thêm
            </Button>
          ) : (
            <>
              <Button
                onClick={handleCancel}
                type="dashed"
                danger
                style={{ fontSize: "18pt", height: "5vh", width: "100%" }}
              >
                Hủy
              </Button>
              {listUser && (
                <List
                  size="large"
                  theme="light"
                  bordered
                  dataSource={listUser}
                  renderItem={(item) => (
                    <Button
                      onClick={() => addFollower(item._id)}
                      style={{ width: "100%" }}
                    >
                      {item.name}
                    </Button>
                  )}
                />
              )}
            </>
          )}

          {items.length > 0 ? (
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[items[0].key]}
              items={items}
              style={{
                backgroundColor: "#d9d9d9",
                fontSize: "18pt",
                textAlign: "center",
              }}
            />
          ) : (
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[]}
              style={{
                backgroundColor: "#d9d9d9",
                fontSize: "18pt",
                textAlign: "center",
              }}
            />
          )}
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
              {chat}
              {/* <Flex justify={"space-between"} style={{ marginBottom: "5vh" }}>
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
              </Flex> */}
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
                rules={[{ required: true, message: "Please input some text!" }]}
              >
                <Input
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="..."
                />
              </Form.Item>
              <Form.Item shouldUpdate style={{ width: "5%" }}>
                {() => (
                  <Button
                    onClick={() => addChat()}
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
