import { useEffect, useRef } from "react";
import Header from "../header/Header";
import { Box, Typography, Button, Grid, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";
import CartItem from "./cartItem";
import Referral from "../earn/Referral";
import axios from "axios";
import { PriceChange } from "@mui/icons-material";

// import { post } from '../../utils/paytm';
// import { payUsingPaytm } from '../../service/api';

const Component = styled(Grid)(({ theme }) => ({
  padding: "30px 135px",
  display: "flex",
  [theme.breakpoints.down("md")]: {
    padding: "15px 0",
  },
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down("sm")]: {
    marginBottom: 15,
  },
}));

const HeaderComponent = styled(Box)`
  padding: 15px 24px;
`;

const BottomWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;

const Cart = () => {
  const cartDetails = useSelector((state) => state.cart);
  const { cartItems } = cartDetails;
  const { id } = useParams();
  const delivered = useRef(false);
  const dispatch = useDispatch();

  axios.defaults.headers={
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }

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

  const addProducts = async () => {
    const products = cartItems.map((val) => {
      const product = {
        productId: val._id,
        quantity: val.quantity,
        orderValue: val.price.cost,
      };
      return product
    });
    const response=await axios.post("http://localhost:8000/addProducts",{
        products:products,
    });
    console.log(response);
  };

  return (
    <>
      <Header />
      {cartItems.length ? (
        <>
          <Component container>
            <LeftComponent item lg={9} md={9} sm={12} xs={12}>
              <HeaderComponent>
                <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                  My Cart ({cartItems?.length})
                </Typography>
              </HeaderComponent>
              {cartItems.map((item) => (
                <CartItem item={item} removeItemFromCart={removeItemFromCart} />
              ))}
              <BottomWrapper>
                <StyledButton variant="contained" onClick={() => addProducts()}>
                  Place Order
                </StyledButton>
              </BottomWrapper>
            </LeftComponent>
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
