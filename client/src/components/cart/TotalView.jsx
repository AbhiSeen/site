import { useState, useEffect } from 'react';

import { Box, Typography, Button, Grid, styled } from "@mui/material";

import axios from 'axios';

const Header = styled(Box)`
    padding: 15px 24px;
    borderBottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
    color: #878787;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
`;

const Price = styled(Typography)`
    float: right;
`;

const TotalAmount = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    border-top: 1px dashed #e0e0e0;
    padding: 20px 0;
    border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Typography)`
    font-size: 16px; 
    color: green;
    margin:10px
`


const BottomWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 2px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  margin:0.5rem;
  background: rgb(104, 85, 224);
  color: #fff;
  border-radius: 2px;
  width: 250px;
//   height: 51px;
`;
// component: {
//     // width: '30%'
// },


const TotalView = ({cartItems}) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        totalAmount();
    }, [cartItems]);
    
    const totalAmount = () => {
        let price = 0, discount = 0;
        // console.log(cartItems);
        cartItems.map(item => {
            price+=(Math.round(item.mrp*item.quantity));
            discount+=item.mrp*item.quantity*(item.discount/100);
        })
        setPrice(price);
        setDiscount(discount);
    }

    const getQuantity=()=>{
        const quantity= cartItems.reduce((prevVal,item)=>prevVal+=item.quantity,0);
        return quantity;
    }

  const addProducts = async () => {
    if(localStorage.getItem("token")){
    const products = cartItems.map((val) => {
      const temp = { productId: val._id, name: val.name ,orderValue:Math.round(val.mrp*val.quantity-(val.mrp*val.quantity*(val.quantity/100)))};
      return temp;
    });
    const response = await axios.post("http://localhost:8000/addProducts", {
      products: products,
    });
    // console.log(products);
  }};
  


    return (
        <Box>  {/* className={classes.component}> */}
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <div className='shadow bg-white rounded-md p-4 mx-2'>
                <Typography>Price ({cartItems?getQuantity():0} item)
                    <Price component="span">₹{price}</Price>
                </Typography>
                <div className='text-gray-600 text-sm my-2'>Discount
                    <Price component="span">-₹{discount}</Price>
                </div>
                <div className='text-gray-600 text-sm my-2'>Delivery Charges
                    <Price component="span">₹40</Price>
                </div>
                <TotalAmount>Total Amount
                    <Price>₹{price- discount + 40}</Price>
                </TotalAmount>
                <Discount>You will save ₹{discount - 40} on this order</Discount>
                <StyledButton variant="contained" onClick={() => addProducts()}>
                  Place Order
                </StyledButton>
            </div>
            {/* <BottomWrapper>
            </BottomWrapper> */}
        </Box>
    )
}

export default TotalView;