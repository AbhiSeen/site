import React, { useState,useContext} from 'react';
import { Dialog, DialogContent, TextField, Box, Button, Typography, styled } from '@mui/material';
import {  authenticateLogin,authenticateSignup } from '../service/api.js';
import {DataContext} from '../../context/DataProvider'
import loginImg from "../images/loginImg.png"
const Component = styled(DialogContent)`
    height: 70vh;
    width: 90vh;
    padding: 0;
    padding-top: 0;
`;
const Image = styled(Box)`
    background: #ffcd4f;
    // background-image:url('../images/loginImg.png');
    width: 25%;
    height: 80%;
    margin-top: 13px;
    padding: 45px 35px;
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
    width: '135%',
    height: '55%',
    marginLeft: '-2rem',
    marginTop:'5rem',
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

const LoginDialog = ({ open, setOpen }) => {
    const [ account, toggleAccount ] = useState(accountInitialValues.login);
    const [ login, setLogin ] = useState(loginInitialValues);
    const [ signup, setSignup ] = useState(signupInitialValues);
    const [ error, setError] = useState(false);
    const {setAccount}   = useContext(DataContext);


    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
       
    }
    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
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
            setAccount(response.data.data.name);
        }
        else {
            setError(true);
        }
    }

    const signupUser = async() => {
        let response = await authenticateSignup(signup);
        console.log(response,signup)
        if(!response) return;
        handleClose();
        setAccount(signup.name);
    }
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Box style={{ display: 'flex', height: '100%' }}>
                    <Image>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                        <img src={loginImg} style={loginStyle}/>
                    </Image>
                    {  
                      account.view === 'login' ? 
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onValueChange(e)} name='email' label="Enter Email" />
                            { error && <Error>Please enter valid Email</Error> }
                            <TextField variant="standard" onChange={(e) => onValueChange(e)} name='password' label="Enter Password" />
                            <Text>By continuing, you agree to  AMFashion's Terms of Use and Privacy Policy.</Text>
                            <LoginButton onClick={() => loginUser()} >Login</LoginButton>
                            <Typography style={{ textAlign: 'center' }}>OR</Typography>
                            <RequestOTP >Request OTP</RequestOTP>
                            <CreateAccount onClick={() => toggleSignup()}>New to AMFashion's? Create an account</CreateAccount>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)}  name='name' label="Enter Full Name" />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)}  name='email' label="Enter  Email" />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)}  name='password'label="Enter Password" />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)}  name='phone' label="Enter Mobile Number" />
                            {/* <TextField variant="standard" onChange={(e) => onInputChange(e)}  name='lastname' label="Enter LastName" />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)}  name='username' label="Enter UserName" /> */}
                            <LoginButton onClick={() => signupUser()}>Explore Now</LoginButton>
                        </Wrapper>
                    }
                </Box>
            </Component>

        </Dialog>
    )
}

export default LoginDialog
