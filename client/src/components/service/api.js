import axios from "axios";

const url = "http://localhost:8000";

const axiosJWT = axios;

export const authenticateLogin = async (data) => {
  try {
    return await axios.post(`${url}/login`, data);
  } catch (error) {
    // console.log("error while calling login API: ");
    return ;
  }
};

export const authenticateSignup = async (data) => {
  try {
    return await axios.post(`${url}/signup`, data);
  } catch (error) {
    return;
  }
};

export const verifyToken = async () => {
  try {
    axiosJWT.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const response = await axiosJWT.post(`${url}/verify`, "");
    if (response.status === 200) return true;
  } catch (err) {
    return false;
  }
};

export const logout = async (token) => {
  try {
    axiosJWT.defaults.headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosJWT.post(`${url}/logout`, "");
    if (response.status === 200) return true;
  } catch (err) {
    return false;
  }
};

export const getUsersList = async () => {
  try {
    axiosJWT.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const response = await axiosJWT.get(`${url}/getUsers`);
    if (response.status === 200) return response.data;
  } catch (err) {
    return false;
  }
};

export const getUserInfo = async (id) => {
  try {
    axiosJWT.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
    const response = await axiosJWT.get(`${url}/getUserInfo/${id}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    return false;
  }
};

export const getOrders = async (id) => {
  axiosJWT.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const response = await axiosJWT.get(`${url}/getOrders/${id}`);
  // console.log(response)
  if (response.status === 200) return response.data;
};

export const addProducts = async (product) => {
  axiosJWT.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const response = await axiosJWT.post(`${url}/addProduct`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // console.log(response)
  if (response.status === 200) return response.data;
};

export const getProducts = async () => {
  axiosJWT.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const response = await axiosJWT.get(`${url}/getProducts`);
  // console.log(response)
  if (response.status === 200) return response.data;
};

export const deleteProduct = async (productId) => {
  axiosJWT.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const response = await axiosJWT.delete(`${url}/deleteProduct/${productId}`);
  // console.log(response)
  if (response.status === 200) return true;
};
