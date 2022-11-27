import axios from "axios";
import * as actionType from "../constants/productConstants";

export const getProducts = () => async (dispatch) => {
  try {
    const {data}  = await axios.get(`http://localhost:8000/getProducts`);
    dispatch({ type: actionType.GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionType.GET_PRODUCTS_FAIL, payload: error.response });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/product/${id}`);
    dispatch({ type: actionType.GET_PRODUCT_DETAILS_REQUEST });
    // console.log(data);

    dispatch({ type: actionType.GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_DETAILS_FAIL,
      payload: error.response,
    });
  }
};
