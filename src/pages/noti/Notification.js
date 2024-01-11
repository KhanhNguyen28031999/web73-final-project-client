import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Avatar, Button, List, RadioChangeEvent, Skeleton } from "antd";
import { Radio, Tabs } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import Header from "../header";

function Notification() {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/messages/id", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.data);
        setList(res.data);
      });
  }, []);
  // const count = 10;
  // const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

  // const onLoadMore = () => {
  //   setLoading(true);
  //   setList(
  //     data.concat(
  //       [...new Array(count)].map(() => ({
  //         loading: true,
  //         name: {},
  //         picture: {},
  //       }))
  //     )
  //   );
  //   fetch(fakeDataUrl)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const newData = data.concat(res.results);
  //       setData(newData);
  //       setList(newData);
  //       setLoading(false);
  //       window.dispatchEvent(new Event("resize"));
  //     });
  // };
  // const loadMore =
  //   !initLoading && !loading ? (
  //     <div
  //       style={{
  //         textAlign: "center",
  //         marginTop: 12,
  //         height: 32,
  //         lineHeight: "32px",
  //       }}
  //     >
  //       <Button onClick={onLoadMore}>loading more</Button>
  //     </div>
  //   ) : null;
  const all =
    list.length > 0 ? (
      <List
        size="large"
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[<a key="list-loadmore-edit">Đánh dấu là đã đọc</a>]}
          >
            {/* <Skeleton avatar title={false} active> */}
            <List.Item.Meta
              avatar={<Avatar src={item.author.image} />}
              title={<a href="https://ant.design">{item.author.name}</a>}
              description={item.content}
            />
            <div>{item.createAt}</div>
            {/* </Skeleton> */}
          </List.Item>
        )}
      />
    ) : (
      <></>
    );
  return (
    <div>
      <Header />
      <Container>
        <Container>
          <Tabs
            defaultActiveKey="1"
            size="large"
            style={{ marginBottom: 32 }}
            items={[
              //   new Array(2).fill(null).map((_, i) => {
              //   const id = String(i + 1);
              //   return {
              //     label: `Tab ${id}`,
              //     key: id,
              //     children: `Content of tab ${id}`,
              //   };
              // })
              { label: `Tất cả`, key: 1, children: all },
              { label: `Chưa đọc`, key: 2, children: all },
            ]}
          />
        </Container>
      </Container>
    </div>
  );
}

export default Notification;
