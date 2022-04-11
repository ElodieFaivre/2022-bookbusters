import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

export function AuthProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();

  const logIn = (token) => {
    localStorage.setItem("jwt", token);
    setConnected(true);
  };
  const logOut = () => {
    localStorage.removeItem("jwt");
    setConnected(false);
    navigate("/");
  };

  const auth = {
    connected,
    logIn,
    logOut,
  };

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default authContext;
