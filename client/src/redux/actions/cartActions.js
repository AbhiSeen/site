import * as actionType from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, quantity) => async (dispatch) => {
  console.log(id, quantity);
  try {
    const { data } = await axios.get(`http://localhost:8000/product/${id}`);
    console.log(actionType.ADD_TO_CART, { data });
    dispatch({ type: actionType.ADD_TO_CART, payload: { ...data, quantity } });
  } catch (error) {
    console.log("Error while calling cart API");
  }
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({
    type: actionType.REMOVE_FROM_CART,
    payload: id,
  });
};
