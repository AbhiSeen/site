import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { logout } from "./service/api";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const logoutUser = async () => {
    const response = await logout();
    console.log({ response });
    if (response) {
      localStorage.removeItem("accountUser");
      navigate("/");
    }
  };

  const token = document.cookie.split("=")[1];
  const user = jwt_decode(token);
  if (user) {
    let current_time = Date.now();
    if (current_time > user.exp * 1000) {
      logoutUser().then(() => console.log("logged out due to expiry"));
    } else {
      return children;
    }
  } else {
    return <Navigate to="/" replace />;
  }
}
export default ProtectedRoute;
