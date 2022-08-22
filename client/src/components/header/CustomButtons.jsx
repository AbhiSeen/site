
import { Box, Button, Typography, styled,Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import React, { useState ,useContext } from 'react';
import LoginDialog from '../login/LoginDialog';
import {DataContext} from '../../context/DataProvider';
import Profile from './profile';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';


const Container = styled(Link)(({ theme }) => ({
  display: 'flex',
  textDecoration:'none',
  color:'inherit',
  [theme.breakpoints.down('md')]: {
    display: 'block'
  }
}));

const Wrapper = styled(Box)(({ theme }) => ({
  margin: '0 3% 0 auto',
  display: 'flex',
  '& > *': {
    marginRight: '40px !important',
   fontSize: 12,
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
     display: 'block'
  
    }
  },
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}));

const LoginButton = styled(Button)(({ theme }) => ({
  color: '#2874f0',
  background: '#FFFFFF',
  fontWeight: 600,
  borderRadius: 2,
  padding: '5px 40px',
  height: 32,
  boxShadow: 'none',
  [theme.breakpoints.down('sm')]: {
    background: '#2874f0',
    color: '#FFFFFF'
  }
}));

const CusttomButtons = ({setLoggedIn}) => {
  const [open, setOpen] = useState(false);
  const {account , setAccount}  = useContext(DataContext);
  const cartDetails = useSelector(state => state.cart);
  const { cartItems } = cartDetails;
  const openDialog = () => {
    setOpen(true);
}
  return (

    <Wrapper>
      {
        account ? <Profile account={account} setAccount={setAccount} /> :
        <LoginButton variant='contained'  onClick={() => openDialog()}>Login</LoginButton>
      }

      <Typography style={{ marginTop: 3, marginLeft: 25 }}>Earn</Typography>
      <Typography style={{ marginTop: 3 ,marginLeft: 25 }}>More</Typography>
      <Container to="/cart">
        <Badge badgeContent={cartItems?.length} color="secondary">
                    <ShoppingCart />
                </Badge>
         <Typography style={{ marginLeft: 10 }}>Cart</Typography>
      </Container>
      <LoginDialog open={open} setOpen={setOpen} setLoggedIn={setLoggedIn}/>
    </Wrapper>
  )
}

export default CusttomButtons;
