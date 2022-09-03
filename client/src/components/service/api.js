import axios from "axios";

const url = "http://localhost:8000";

export const authenticateLogin = async (data) => {
  try {
    return await axios.post(`${url}/login`, data);
  } catch (error) {
    console.log("error while calling login API: ", error);
    return error.response;
  }
};

export const authenticateSignup = async (data) => {
  try {
    return await axios.post(`${url}/signup`, data);
  } catch (error) {
    console.log("error while calling Signup API: ", error);
  }
};

export const verifyToken = async () => {
  try {
    const response = await axios.post(`${url}/verify`, "", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status===200) return true;
  } catch (err) {
    return false;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${url}/logout`, "", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) return true;
  } catch (err) {
    return false;
  }
};

