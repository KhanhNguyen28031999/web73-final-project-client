import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/auth/login";
import { Register, Login } from "./components/antdesigns/auth";
import Home from "./pages/home/homepage";
import Profile from "./pages/profile";
import Notification from "./pages/noti/Notification";
import Message from "./pages/message/Message";
import PostDetail from "./components/posts/post-detail";
import ProfileId from "./pages/profileid";

function App() {
  const [queryClient, setQueryClient] = useState(new QueryClient());
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/auth/login");
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<ProfileId />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
