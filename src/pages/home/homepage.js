import React from "react";

// import Footer from "../footer";
import Header from "../header";

import "./style.css";

import MainPage from "./components/main";
import RightBar from "./components/rightbar";
import LeftBar from "./components/leftbar";
import Footer from "../footer";

const Home = () => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Header style={{ margin: 0, padding: 0 }} />
      <div className="home-page-body" style={{ margin: 0, padding: 0 }}>
        <div className="home-page-body">
          <div className="page-body">
            <MainPage />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
