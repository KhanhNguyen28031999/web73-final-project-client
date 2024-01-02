import { createContext, useContext, useState } from "react";

const AuthConext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthConext.Provider value={{ user, login, logout }}>
      {children}
    </AuthConext.Provider>
  );
};

const useAuth = () => useContext(AuthConext);

export { AuthProvider, useAuth };
