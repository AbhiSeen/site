
import { Box, Button, Typography, styled,Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import React, { useState ,useContext, useEffect } from 'react';
import LoginDialog from '../login/LoginDialog';
import {DataContext} from '../../context/DataProvider';
import Profile from './profile';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { NavLink } from "react-router-dom";
import Wallet from '../home/Wallet';
import './Search.css';



const Container = styled(Link)(({ theme }) => ({
  display: 'flex',
  textDecoration:'none',
  color:'inherit',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection:'row',
    fontSize:'16px',
    padding: '0.7rem',
    borderTop: '0.7px solid grey',
    width:'100%',
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
    display: 'flex',
    flexDirection: 'column', 
    height: '90vh',
    padding: '1rem',
  }
}));
const TypographyBtn = styled(Typography)(({ theme }) => ({
  margin: '0 3% 0 auto',
  display: 'flex',
  justifyContent:'space-between',
  marginTop: 3, marginLeft: 15 ,
    [theme.breakpoints.down('md')]: {
    padding: '0.7rem',
    display: 'flex',
    flexDirection:'row',
    fontSize:'16px',
    borderTop: '0.7px solid grey',
    margin: '0',
    width:'100%',
    }

}));
const LoginButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  background: '#3923d4',
  fontWeight: 600,
  borderRadius: 2,
  padding: '5px 40px',
  height: 32,
  boxShadow: 'none',
  [theme.breakpoints.down('sm')]: {
    background: '#3923d4',
    color: '#FFFFFF',
    boxShadow: 'none',
  }
}));

const CusttomButtons = () => {
  const [open, setOpen] = useState(false);
  const {account , setAccount}  = useContext(DataContext);
  const [storedata,setStore]=useState('');
  const [noofItems,setNoOfItems]=useState(0);
  const Userresponse= (localStorage.getItem("accountUser")!=="guest" ? localStorage.getItem("accountUser") : "");
   

  const getQuantity=()=>{
    if(localStorage.getItem("cartItem")){
      return JSON.parse(localStorage.getItem("cartItem")).cartItems.reduce((prevVal,item)=>prevVal+=item.quantity,0);
    }
  }
  
  useEffect(()=>{
    console.log("in useEffect")
    setNoOfItems(getQuantity());
  });

// setStore(Userresponse)
  const openDialog = () => {
      setOpen(true);
  }
  return (

    <Wrapper>
      {
        Userresponse ? <Profile account={Userresponse} setAccount={setAccount} /> :
        <button className="loginBtn"  onClick={() => openDialog()}>Login</button>
        // <LoginButton variant='contained' >Login</LoginButton>
      }

      <TypographyBtn style={{ color:'#6855e0'}}>
        <NavLink exact="true" to="/Wallet" className='navlink about-sec-money fontColorStyle' style={{color:'#6855e0',fontWeight:600}}> 
          <AccountBalanceWalletIcon style={{marginRight:'4px'}} className='fontColorStyle'/>
          Wallet
        </NavLink>
      </TypographyBtn> 
      <Container to="/cart">
        {/* ToDo - Refresh quantity after adding new items*/}
        <Badge badgeContent={noofItems} color="secondary">
            <LocalMallRoundedIcon  className='fontColorStyle' style={{color:'#6855e0'}}/>
        </Badge>
        <Typography style={{ marginLeft: 4 ,color:'#6855e0',fontWeight:600 ,marginTop:4}} className='fontColorStyle'>Cart</Typography>
      </Container>
      <LoginDialog open={open} setOpen={setOpen}/>
    </Wrapper>
  )
}

export default CusttomButtons;
