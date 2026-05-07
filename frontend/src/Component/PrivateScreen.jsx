import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login/Login";
const PrivateScreen = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return <div>{isAuthenticated ? <Outlet /> : <Login />}</div>;
};

export default PrivateScreen;
