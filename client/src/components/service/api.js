import axios from "axios";

const url = "http://localhost:8000";

const axiosJWT = axios;


setInterval(() => {
  if (document.cookie) {
    const token = document.cookie.split("=")[1];
    if (token) {
        refreshToken().then((response)=>{
          if(response.data.message.includes("expiry")){
            localStorage.clear();
            document.location.reload();
          }else{
            console.log("refreshed")
          }
        });
    }
  }else{
    localStorage.clear();
    document.location.reload();
  }
}, 120000);

const refreshToken = async () => {
  try {
    return await axios.post(`${url}/refresh`, "", { withCredentials: true });
  } catch (error) {
    // console.log("error while calling login API: ");
    return error;
  }
};

export const authenticateLogin = async (data) => {
  try {
    return await axios.post(`${url}/login`, data, { withCredentials: true });
  } catch (error) {
    // console.log("error while calling login API: ");
    return;
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
    const response = await axiosJWT.post(`${url}/verify`, "", { withCredentials: true });
    if (response.status === 200) return true;
  } catch (err) {
    return false;
  }
};

export const logout = async (token) => {
  try {
    const response = await axiosJWT.post(`${url}/logout`, "", { withCredentials: true });
    if (response.status === 200) return true;
  } catch (err) {
    return false;
  }
};

export const getUsersList = async () => {
  try {
    const response = await axiosJWT.get(`${url}/getUsers`, { withCredentials: true });
    if (response.status === 401) logout().then(() => console.log("logging due to invalid token"));
    if (response.status === 200) return response.data;
  } catch (err) {
    return false;
  }
};

export const getUserInfo = async (id) => {
  try {
    const response = await axiosJWT.get(`${url}/getUserInfo/${id}`, { withCredentials: true });
    if (response.status === 200) return response.data;
  } catch (err) {
    return false;
  }
};

export const getOrders = async (id) => {
  let response = "";
  if (id) {
    response = await axiosJWT.get(`${url}/getOrders?id=${id}`, { withCredentials: true });
  } else {
    response = await axiosJWT.get(`${url}/getOrders`, { withCredentials: true });
  }
  // console.log(response)
  if (response.status === 200) return response.data;
};

export const addProducts = async (product) => {
  const response = await axiosJWT.post(`${url}/addProduct`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  // console.log(response)
  if (response.status === 200) return response.data;
};

export const getProducts = async () => {
  const response = await axiosJWT.get(`${url}/getProducts`, { withCredentials: true });
  // console.log(response)
  if (response.status === 200) return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await axiosJWT.delete(`${url}/deleteProduct/${productId}`, {
    withCredentials: true,
  });
  // console.log(response)
  if (response.status === 200) return true;
};
