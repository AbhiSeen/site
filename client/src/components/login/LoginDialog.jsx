import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Box,
  Button,
  Typography,
  styled,
  Icon,
} from "@mui/material";
import { authenticateLogin, authenticateSignup } from "../service/api.js";
import { DataContext } from "../../context/DataProvider";
import loginImg from "../images/loginForm.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CloseRounded } from "@mui/icons-material";
import "./Login.css";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';


const DialogBox = styled(Dialog)`
 @media screen and (max-width: 800) {

        margin:0 !important;
  }
`;
const Component = styled(DialogContent)`
  height: 92vh;
  width: 150vh;
  padding: 0;
  padding-top: 0;
    @media screen and (max-width :999px){
    height: 100%;
    width:100%;
    margin: 22px 0 0 0px;
    padding: 26px 10px;


    }
`;
const Image = styled(Box)`
// background: rgb(151,191,255);
// background: linear-gradient(90deg, rgba(151,191,255,1) 0%, rgba(57,35,212,1) 100%);
//   background: #ffcd4f;
  // background-image:url('../images/loginImg.png');
  width: 55%;
  height: 96%;
  margin-top: 13px;
  padding: 45px 35px;
  & > p,
  & > h5 {
    color: #ffffff;
    font-weight: 600;
  }
  @media screen and (max-width: 999px) {
    display:none;
  }
`;
const Wrapper = styled(Box)`
border-radius: 10px;
border-bottom: 10px solid #8686b7;
border-top: 10px solid #8686b7;
height: 77vh;
margin: 50px 40px;
padding: 10px 35px;
background-color:white;
display: flex;
flex: 1;
overflow: hidden;
flex-direction: column;
& > div,
& > button,
& > p {
margin-top: 20px;
}
  @media screen and (max-width :999px){
    height: 100%;
    margin: 22px 0 0 0px;
    padding: 26px 10px;
    

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
  cursor: pointer;
`;

const Error = styled(Typography)`
  font-size: 12px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 500;
`;
const loginStyle = {
  width: "48%",
  height: "52%",
//   marginLeft: "-2rem",
  marginTop: "5rem",
    position: 'absolute',

};
const loginInitialValues = {
  email: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
};
const accountInitialValues = {
  login: {
    view: "login",
    heading: "Login",
    subHeading: "Get access to your Orders, Wishlist and Recommendations",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here",
    subHeading: "Signup to get started",
  },
};

const ValidationTextField = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "#ffbd83",
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important", // override inline-style
  },
});

const LoginDialog = ({ open, setOpen }) => {
  const [account, toggleAccount] = useState(accountInitialValues.login);
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState(false);
  const { setAccount } = useContext(DataContext);
  const [disabled, setDisabled] = useState({});
  const navigate = useNavigate();
  const [useraccount, setUserAccount]= useState({});
  const [loginError, setLoginError]= useState({});

  const url = process.env.REACT_APP_API_BASE_URL;

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValues.login);
    setError(false);
  };
  const toggleSignup = () => {
    toggleAccount(accountInitialValues.signup);
  };
  const toggleLogin = () => {
    toggleAccount(accountInitialValues.login);
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    setDisabled({ ...disabled, login: true });
    const response = await authenticateLogin(login);
    if(response.status===200){
      const {  fullName } = response.data;
      if (response.status === 200) {
        if (!fullName.includes("admin")) {
          setTimeout(() => {
            localStorage.setItem("accountUser", fullName.split(" ")?.length>0 ? fullName.split(" ")[0] : fullName);
            setAccount(fullName.split(" ")[0]);
            handleClose();
          }, 1000);
        }else{
          setOpen(false);
          navigate("/dashboard");
        }
      } else {
        setError(true);
      }
    }else{
      setLoginError("Invalid Credentials");
    }  
    setDisabled({ ...disabled, login: false });
  };

  const signupUser = async () => {

    setDisabled({ ...disabled, signUp: true });
    let response = await authenticateSignup(signup);
    
    setUserAccount(response?.data?.message);
    if(response?.data?.message == "successfully signed up")
    {
        setOpen(false);
    toggleAccount(accountInitialValues.login);
    setError(false);
    }
  
    if (!response) return;
    setDisabled({ ...disabled, signUp: false });
  };

  return (
    <DialogBox
      open={open}
      style={{ margin: '0px' }}
      onClose={handleClose}
      className="dailogBox"
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      {/* <div className="closeBox">
        <button className="cancelBtn" onClick={handleClose}>
          <CloseRounded onClick={handleClose} className="closeIcon" />
        </button>
      </div> */}
      <Component className="loginCard"> 
          <Image> 
            <Typography variant="h5" style={{color:'#444d9b'}}>{account.heading}</Typography>
            <Typography style={{ marginTop: 20 ,color:'#444d9b'}}>
              {account.subHeading}
            </Typography>
            <img src={loginImg} style={loginStyle} />
           </Image>
          {account.view === "login" ? (
            <Wrapper>
                <div className="amFashion">AMFashion</div>
              <ValidationTextField
                variant="outlined"
                id="validation-outlined-input"
                onChange={(e) => onValueChange(e)}
                name="email"
                label="Enter Your Email"
              />
              <ValidationTextField
                type="password"
                variant="outlined"
                id="validation-outlined-input-password"
                onChange={(e) => onValueChange(e)}
                name="password"
                label="Enter Your Password"
                  />

              {error && <Error>Please enter valid email/password</Error>}
              <Text>
                By continuing, you agree to AMFashion's Terms of Use and Privacy
                Policy.
              </Text>
              {
            loginError== 'Invalid Credentials' ? 
            ( 
            <div className="WarningMsg">
                <WarningRoundedIcon/>
                <p className="warningData">{loginError} !</p>
            </div>
            )
            : null}
              <button
                className="button-24"
                role="button"
               style={{width:'100%',padding:'1rem 0',margin: '1rem 0'}}
                onClick={() => loginUser()}
                >
                Login
              </button>
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              <button className="requestOtp" role="button">
                Request OTP
              </button>
              <CreateAccount onClick={() => toggleSignup()}>
                New to AMFashion's?
                <span className="toggleBtn">Create an account</span>
              </CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
                 <div className="amFashion">AMFashion</div>
              <ValidationTextField
                variant="outlined"
                id="validation-outlined-input"
                onChange={(e) => onInputChange(e)}
                name="name"
                label="Enter Full Name"
              />
              <ValidationTextField
                variant="outlined"
                id="validation-outlined-input"
                onChange={(e) => onInputChange(e)}
                name="email"
                label="Enter Your Email"
              />
              <ValidationTextField
                variant="outlined"
                id="validation-outlined-input"
                onChange={(e) => onInputChange(e)}
                name="phone"
                label="Enter Mobile Number"
              />
              <ValidationTextField
                variant="outlined"
                id="validation-outlined-input"
                onChange={(e) => onInputChange(e)}
                name="password"
                label="Enter Password"
              />
              <button
                className="button-24"
                role="button"
                style={{width:'100%',padding:'1rem 0',margin: '1rem 0'}}
                onClick={() => signupUser()}
              >
                Explore Now
              </button>
            {
            useraccount == 'already exists' ? 
               ( 
                <div className="WarningMsg">
                    <WarningRoundedIcon/>
                    <p className="warningData">Account {useraccount} !</p>
                </div>)
            : null}
              <CreateAccount onClick={() => toggleLogin()}>
                Already have a account ?
                <span className="toggleBtn">Login</span>
              </CreateAccount>
            </Wrapper>
          )} 
      </Component>
    </DialogBox>
  );
};

export default LoginDialog;