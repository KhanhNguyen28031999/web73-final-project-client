import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/auth/login";
import { Register, Login } from "./components/antdesigns/auth";
import Home from "./pages/home/homepage";
import Profile from "./pages/profile";

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
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
