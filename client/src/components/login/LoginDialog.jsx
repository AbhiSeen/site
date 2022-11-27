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
import loginImg from "../images/loginImg.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CloseRounded } from "@mui/icons-material";

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
  & > p,
  & > h5 {
    color: #ffffff;
    font-weight: 600;
  }
`;
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
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
  width: "135%",
  height: "55%",
  marginLeft: "-2rem",
  marginTop: "5rem",
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
    const { authToken, fullName } = response.data;
    if (response.status === 200 && !fullName.includes("admin") && authToken) {
      localStorage.setItem("token", authToken);
      setTimeout(() => {
        setAccount(fullName.split(" ")[0]);
        handleClose();
      }, 1000);
    } else if (fullName.includes("admin") && authToken) {
      localStorage.setItem("token", authToken);
      setOpen(false);
      navigate("/dashboard");
    } else {
      setDisabled({ ...disabled, login: false });
      setError(true);
    }
  };

  const signupUser = async () => {
    setDisabled({ ...disabled, signUp: true });
    let response = await authenticateSignup(signup);
    if (!response) return;
    setDisabled({ ...disabled, signUp: false });
  };

  return (
    <Dialog
      open={open}
      style={{ mergin: 0 }}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      <div className="closeBox">
        <button className="cancelBtn" onClick={handleClose}>
          <CloseRounded onClose={handleClose} className="closeIcon" />
        </button>
      </div>
      <Component className="loginCard">
        <Box style={{ display: "flex", height: "100%" }}>
          <Image>
            {/* <LoginBg /> */}
            <Typography variant="h5">{account.heading}</Typography>
            <Typography style={{ marginTop: 20 }}>
              {account.subHeading}
            </Typography>
            <img src={loginImg} style={loginStyle} />
          </Image>
          {account.view === "login" ? (
            <Wrapper>
              <ValidationTextField
                variant="outlined"
                id="validation-outlined-input"
                onChange={(e) => onValueChange(e)}
                name="email"
                label="Enter Your Email"
              />
              {/* <TextField variant="standard" onChange={(e) => onValueChange(e)} name='email' label="Enter Your Email" /> */}
              {error && <Error>Please enter valid Email</Error>}
              <ValidationTextField
                variant="outlined"
                id="validation-outlined-input"
                onChange={(e) => onValueChange(e)}
                name="password"
                label="Enter Your Password"
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
              <Text>
                By continuing, you agree to AMFashion's Terms of Use and Privacy
                Policy.
              </Text>
              <button
                className="button-24"
                role="button"
                onClick={() => loginUser()}
              >
                Login
              </button>
              {/* <LoginButton onClick={() => loginUser()} >Login</LoginButton> */}
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              <button class="button-81" role="button">
                Request OTP
              </button>
              <CreateAccount onClick={() => toggleSignup()}>
                New to AMFashion's?{" "}
                <span className="toggleBtn">Create an account</span>
              </CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
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
                onClick={() => signupUser()}
              >
                Explore Now
              </button>

              <CreateAccount onClick={() => toggleLogin()}>
                Already have a account ?{" "}
                <span className="toggleBtn">Login</span>
              </CreateAccount>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
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
