import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";

const RequireAuth = ({ isAdminRequired, children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/LogIn" />;
  }

  if (!user.isAdmin && isAdminRequired) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;
