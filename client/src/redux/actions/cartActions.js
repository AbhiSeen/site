import * as actionType from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, quantity) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/getProducts?id=${id}`);
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


export const increaseQuantity=(item)=>(dispatch)=>{
  dispatch({type:actionType.INCREASE_QUANTITY,payload:item})
}

export const decreaseQuantity=(item)=>(dispatch)=>{
  dispatch({type:actionType.DECREASE_QUANTITY,payload:item})
}