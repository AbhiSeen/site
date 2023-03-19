import * as actionTypes from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  const item = action.payload;
  let newCartItems = [];
  if (localStorage.getItem("cartItem"))
    state.cartItems = JSON.parse(localStorage.getItem("cartItem")).cartItems;
  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
      const existItem = state.cartItems.find(
        (product) => product._id === item._id
      );
      if (existItem) {
        newCartItems = {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === item._id ? { ...x, quantity: x.quantity + 1 } : x
          ),
        };
      } else {
        newCartItems = { ...state, cartItems: [...state.cartItems, item] };
      }
      localStorage.setItem("cartItem", JSON.stringify(newCartItems));
      return newCartItems;
    }
    case actionTypes.REMOVE_FROM_CART: {
      newCartItems = {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product._id !== action.payload
        ),
      };
      localStorage.setItem("cartItem", JSON.stringify(newCartItems));
      return newCartItems;
    }
    case actionTypes.INCREASE_QUANTITY: {
      newCartItems = {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x._id === item._id ? { ...x, quantity: x.quantity + 1 } : x
        ),
      };
      localStorage.setItem("cartItem", JSON.stringify(newCartItems));
      return newCartItems;
    }
    case actionTypes.DECREASE_QUANTITY: {
      newCartItems = {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x._id === item._id ? { ...x, quantity: x.quantity - 1 } : x
        ),
      };
      localStorage.setItem("cartItem", JSON.stringify(newCartItems));
      return newCartItems;
    }
    default:
      return state;
  }
};
