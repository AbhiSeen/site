import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  if (token) {
    const user = jwt_decode(token);
    // console.log(user)
    if(user.username === "admin"){
      let current_time = Date.now().valueOf() / 1000;
      if (current_time > user.exp) {
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
