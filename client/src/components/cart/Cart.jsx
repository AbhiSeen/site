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

const Component = styled(Grid)(({ theme }) => ({
    display: 'flex',
    backgroundColor: 'rgb(238, 238, 238)',
    padding: '5rem 5rem 0 5rem',
  [theme.breakpoints.down("md")]: {
    padding: "15px 0",
  },
}));



const HeaderComponent = styled(Box)`
  padding: 1rem;
`;


const Cart = () => {
  const cartDetails = useSelector((state) => state.cart);
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
        <>
          <Component container>
            <div className="shadow bg-white rounded-md p-2 m-4 w-8/12">
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
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <TotalView cartItems={cartItems} />
            </Grid>
          </Component>
        </>
      ) : (
        <EmptyCart />
      )}
      <Referral delivered={true} />
    </>
  );
};

export default Cart;
