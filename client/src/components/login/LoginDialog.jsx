import React, { useState,useContext} from 'react';
import { Dialog, DialogContent, TextField, Box, Button, Typography, styled } from '@mui/material';
import {  authenticateLogin,authenticateSignup } from '../service/api.js';
import {DataContext} from '../../context/DataProvider'
import loginImg from "../images/loginImage.png"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import axios from "axios";
import "./Login.css";
import LoginBg from "./LoginBg";
import { Link } from "react-router-dom";



const Component = styled(DialogContent)`
    width: 65vw;
    height: 84vh;
    padding: 0;
    padding-top: 0;
`;
const Image = styled(Box)`

    // background-image:url('../images/loginImage.png');
    width: 50%;
    height: 84%;
    padding: 45px 35px;
    // background: #ffbd83;
    // background-color: linear-gradient( 180.3deg,  rgba(214,224,255,1) 37.2%, rgba(254,168,168,1) 137.3% );
    background: rgb(206,225,255);
    background: linear-gradient(90deg, rgba(206,225,255,1) 0%, rgba(255,168,180,1) 100%);
    /* margin-top: 13px; */
    z-index: 11;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600
    }
`;
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;
const LoginButton = styled(Button)`
    text-transform: none;
    background: #2874f0;
    color: #fff;
    height: 40px;
    border-radius: 5px;
`;

const RequestOTP = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border: 1px #2874f0;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;
const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer
`

const Error = styled(Typography)`
    font-size: 12px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 500;
`
const loginStyle={
    width: '100%',
    height: '90%',
    // marginLeft: '-2rem',
    // marginTop:'5rem',
}
const loginInitialValues = {
    email: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    email: '',
    password: '',
    phone: ''
};
const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
}


const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
      borderColor: '#ffbd83',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  });

const LoginDialog = ({ open, setOpen }) => {
    const [ account, toggleAccount ] = useState(accountInitialValues.login);
    const [ login, setLogin ] = useState(loginInitialValues);
    const [ signup, setSignup ] = useState(signupInitialValues);
    const [ error, setError] = useState(false);
    const {setAccount}   = useContext(DataContext);

    const prevDetails={  email: "", password: "" };
    const [user,setUserDetails] = useState({  email: "", password: "" });
    const url = process.env.REACT_APP_API_BASE_URL;
    axios.defaults.headers = {
      withCredentials:false,
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserDetails((prevDetails)=>({
        ...prevDetails,
        [name]:value
      }))
    }
  
    const handleSubmit = async (e) => {
        await axios.post(`${url}/login`, {
          email: user.email,
          password: user.password,     
        })
        setUserDetails(prevDetails);
      // console.log(user);
    }
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
      }));
    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
       
    }
    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    }
    const toggleLogin = () => {
        toggleAccount(accountInitialValues.login);
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const loginUser = async() => {
        let response = await authenticateLogin(login);
        if(response.status === 200) {
            handleClose();
            console.log(response);
            setAccount(response.data.data.name);
        }
        else {
            setError(true);
        }
    }

    const signupUser = async() => {
        let response = await authenticateSignup(signup);
        // console.log(response,signup)
        if(!response) return;
        handleClose();
        setAccount(signup.name);
    }
    return (
        <Dialog open={open}  style={{ mergin:0 }} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
        <div className='closeBox'>
            <button  className="cancelBtn" onClick={handleClose}><CloseRoundedIcon onClose={handleClose} className='closeIcon'/></button>
        </div>
        <Component className="loginCard">
            <Box style={{ display: 'flex', height: '100%' }}>
                <Image>
                    {/* <LoginBg /> */}
                    <Typography variant="h5">{account.heading}</Typography>
                    <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                    <img src={loginImg} style={loginStyle}/>
                </Image>
                {  
                  account.view === 'login' ? 
                    <Wrapper>
                        <ValidationTextField variant="outlined" id="validation-outlined-input"
                        onChange={(e) => onValueChange(e)} name='email' label="Enter Your Email"/>
                        {/* <TextField variant="standard" onChange={(e) => onValueChange(e)} name='email' label="Enter Your Email" /> */}
                        { error && <Error>Please enter valid Email</Error> }
                        <ValidationTextField variant="outlined" id="validation-outlined-input" 
                        onChange={(e) => onValueChange(e)} name='password' label="Enter Your Password"
                        // id="outlined-adornment-password"
            // type={values.showPassword ? 'text' : 'password'}
            // value={values.password}
            // onChange={handleChange('password')}
            // endAdornment={
            //   <InputAdornment position="end">
            //     <IconButton
            //       aria-label="toggle password visibility"
            //       onClick={handleClickShowPassword}
            //       onMouseDown={handleMouseDownPassword}
            //       edge="end"
            //     >
            //       {values.showPassword ? <VisibilityOff /> : <Visibility />}
            //     </IconButton>
            //   </InputAdornment>
            // }
                        />

                        {/* <TextField variant="standard" onChange={(e) => onValueChange(e)} name='password' label="Enter Your Password" /> */}
                        <Text>By continuing, you agree to  AMFashion's Terms of Use and Privacy Policy.</Text>
                        <button className="button-24" role="button" onClick={() => loginUser()} >Login</button>
                        {/* <LoginButton onClick={() => loginUser()} >Login</LoginButton> */}
                        <Typography style={{ textAlign: 'center' }}>OR</Typography>
                        <button class="button-81" role="button">Request OTP</button>
                        <CreateAccount onClick={() => toggleSignup()}>New to AMFashion's? <span className='toggleBtn'>Create an account</span></CreateAccount>
                    </Wrapper>
                    :
                    <Wrapper>
                        <ValidationTextField variant="outlined" id="validation-outlined-input"
                        onChange={(e) => onInputChange(e)}  name='name' label="Enter Full Name" />
                        <ValidationTextField variant="outlined" id="validation-outlined-input"
                        onChange={(e) => onInputChange(e)} name='email' label="Enter Your Email"/>
                        <ValidationTextField variant="outlined" id="validation-outlined-input"
                        onChange={(e) => onInputChange(e)} name='phone' label="Enter Mobile Number"/>
                        <ValidationTextField variant="outlined" id="validation-outlined-input"
                        onChange={(e) => onInputChange(e)} name='password'label="Enter Password" />
                        <button className="button-24" role="button" onClick={() => loginUser()} >Explore Now</button>

                        <CreateAccount onClick={() => toggleLogin()}>Already have a account ? <span className='toggleBtn'>Login</span></CreateAccount>


                    </Wrapper>
                }   
            </Box>
        </Component>
        </Dialog>
        )
    }
    
    export default LoginDialog
    // </Dialog>
    


        //         <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
    
        //     <div className="loginContainer">
        //   <div className="loginDetails">
        //     <h1 className="loginHeader">Welcome to the family</h1>
        //     <h1 className="loginMsg">
        //       Login to explore the fashion
        //       {/* <FontAwesomeIcon icon={artstation} /> */}
        //     </h1>
        //     <div className="inputBox">
        //       <label className="userLabel">E-mail</label>
        //       <input
        //         type="email"
        //         placeholder="Enter your Email"
        //         className="userInput"
        //         name="email"
        //         value={user.email}
        //         onChange={handleChange} 
        //       />
        //       <label className="userLabel">Password</label>
        //       <input
        //         type="password"
        //         placeholder="Enter your Password"
        //         className="userInput"
        //         name="password"
        //         value={user.password}
        //         onChange={handleChange} 
        //       />
        //       <button className="loginBtn" onClick={handleSubmit}>Login</button>
        //     </div>
        //     <div className="lineBox">
        //     <div className="forgotBox"></div> Or
        //       <div className="forgotBox"></div>
        //     </div>
        //     <p className="forgot">
        //       Forgot Password ? <Link to="/" className="forgotSignup">Sign Up</Link>
        //     </p>
        //   </div>
        //   <LoginBg />
        // </div>
        //     </Dialog>