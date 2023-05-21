import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ getLoggedIn }) => {
  const auth = { token: getLoggedIn() };

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
