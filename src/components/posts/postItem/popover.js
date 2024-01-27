import React from "react";
import { Button, Popover, ConfigProvider } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const content = (
  <div>
    <p>Chỉnh sửa bài viết</p>
    <p>Thay đổi quyền riêng tư</p>
    <p>Xoá bài viết</p>
  </div>
);

const buttonWidth = 10;

const PopOver = () => (
  <ConfigProvider
    button={{
      style: {
        width: buttonWidth,
        margin: -27,
        border: "none",
        backgroundColor: "transparent",
        color: "black",
      },
    }}
  >
    <div className="demo">
      <div style={{ width: buttonWidth, float: "inline-start" }}>
        <Popover placement="rightTop" content={content}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Popover>
      </div>
    </div>
  </ConfigProvider>
);

export default PopOver;
