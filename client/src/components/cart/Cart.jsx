import { useEffect } from "react";
import Header from "../header/Header";
import { Box, Typography, Button, Grid, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";
import CartItem from "./cartItem";
import Referral from "../Referral/Referral";
import axios from "axios";


// import { post } from '../../utils/paytm';
// import { payUsingPaytm } from '../../service/api';

const CartComp= styled(Box)`
    background-color: rgb(238, 238, 238);
    display:flex;
    flex-wrap: wrap;
    padding: 6rem 8rem;
    justify-content: center;
    @media screen and (max-width: 850px) {
         padding: 5rem 0;
    }
`;
const HeaderComponent = styled(Box)`
  padding: 1rem;
`;


const Cart = () => {
  const cartDetails = useSelector((state) => state.cart);
  console.log({cartDetails})
  const { cartItems } = cartDetails;
  const { id } = useParams();
  const dispatch = useDispatch();

  axios.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (cartItems && id !== cartItems.id) dispatch(addToCart(id));
    // console.log(cartItems);
  }, [dispatch, cartItems, id]);

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  // const buyNow = async () => {
  //     let response = await payUsingPaytm({ amount: 500, email: 'codeforinterview01@gmail.com'});
  //     var information = {
  //         action: 'https://securegw-stage.paytm.in/order/process',
  //         params: response
  //     }
  //     post(information);
  // }


  return (
    <>
      <Header />
      {cartItems.length ? (
        <CartComp className="h-screen">
          {/* <Component container> */}
            <div className="shadow bg-white rounded-md p-2 m-4 w-full lg:w-8/12 xl:w-8/12 h-min ">
              <HeaderComponent>
                <Typography style={{ fontWeight: 500, fontSize: 16 }}>
                  My Cart
                </Typography>
                {console.log({cartItems})}
              </HeaderComponent>
              {cartItems.map((item) => (

                <CartItem item={item} removeItemFromCart={removeItemFromCart} />
              ))}
              
            </div>
          {/* </Component> */}
            <div>
              <TotalView cartItems={cartItems} />
            </div>
        </CartComp>
      ) : (
        <EmptyCart />
      )}
      <Referral delivered={true} />
    </>
  );
};

export default Cart;
