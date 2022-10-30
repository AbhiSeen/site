import { useState } from 'react';
import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
// import { payUsingPaytm } from '../../service/api';
// import { post } from '../../utils/paytm';
import CasualShoes from "../images/CasualShoes.png";
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '30%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('lg')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    padding: '15px',
});

const StyledButton = styled(Button)(({ theme }) => ({
    width: '40%',
    borderRadius: "2px",
    height: "50px",
    [theme.breakpoints.down('lg')]: {
        width: '46%'
    },
    [theme.breakpoints.down('sm')]: {
        width: '48%'
    }
   
}));

const CategoryCard = () => {
  const navigate = useNavigate();
  const  id = 1;
      
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // const buyNow = async () => {
  //     let response = await payUsingPaytm({ amount: 500, email: 'codeforinterview01@gmail.com'});
  //     var information = {
  //         action: 'https://securegw-stage.paytm.in/order/process',
  //         params: response    
  //     }
  //     // post(information);
  // }

  const addItemToCart = () => {
      dispatch(addToCart(id, quantity));
      navigate('/cart');
  }

  // onClick={() => buyNow()}

  return (
      <LeftContainer>
          <Box style={{ padding: '15px 20px',
             border: '1px solid #f0f0f0',
              width: '90%',
              boxShadow: '0px 0px 10px 0px rgba(176, 176, 176, 0.75)',
              // backgroundColor:'yellow',
              marginBottom: '0.5rem',
              cursor:'pointer',
              }}> <Image src={CasualShoes} alt="none" /><br />
              </Box>
         
          <StyledButton   onClick={() => addItemToCart()}   style={{marginRight: 10, background: '#ffcd4f'}} variant="contained"><LocalMallRoundedIcon style={{marginRight: 10,}}/>Add to Cart</StyledButton>
          <StyledButton     style={{background: '#ff0000'}} variant="contained"><Flash /> Buy Now</StyledButton>
      </LeftContainer>
  )
}

export default CategoryCard