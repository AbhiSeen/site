import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { logout } from "./service/api";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const logoutUser = async () => {
    const response = await logout();
    if (response) {
      localStorage.setItem("accountUser","guest");
      navigate("/");
    }
  };

  if(localStorage.getItem("accountUser")!=="guest"){
    const token = document.cookie?.split("=")[1];
    if(token){
      const user = jwt_decode(token);
        let current_time = Date.now();
        if (current_time > user.exp * 1000) {
          logoutUser().then(() => alert("logged out due to session timeout"));
        } else {
          return children;
        }
    }else {
      return <Navigate to="/" replace />;
    }
  }else{
    return children;
  }
}
export default ProtectedRoute;
