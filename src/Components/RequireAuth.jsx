import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ isAdminRequired,user, children, }) => {
  if (!user ) {
    return <Navigate to="/LogIn" />;
  }
  
  if (!user.isAdmin && isAdminRequired){
  return  <Navigate to="/" />;  
    
 }
    
  return children;
};

export default RequireAuth;
