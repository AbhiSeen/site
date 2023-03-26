import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    const user = jwt_decode(token);
    if(user.email.includes("admin")){
      let current_time = Date.now();
      if (current_time > user.exp*1000) {
        return <Navigate to="/" replace />;
      } else {
        return children;
      }
    }
  }else{
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
