import { useState } from "react";
import { Button, Box, styled } from "@mui/material";
import {
  ShoppingCart as Cart,
  FlashOn as Flash,
  Share,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import { payUsingPaytm } from '../../service/api';
// import { post } from '../../utils/paytm';
import { addToCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: "40%",
  padding: "40px 0 0 80px",
  [theme.breakpoints.down("lg")]: {
    padding: "20px 40px",
  },
}));

const Image = styled("img")({
  padding: "15px",
});

const StyledButton = styled(Button)(({ theme }) => ({
  width: "40%",
  borderRadius: "2px",
  height: "50px",
  [theme.breakpoints.down("lg")]: {
    width: "46%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "48%",
  },
}));

const ActionItem = ({ product }) => {
  const navigate = useNavigate();
  const  {id}  = product;
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  axios.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // const buyNow = async () => {
  //     let response = await payUsingPaytm({ amount: 500, email: 'codeforinterview01@gmail.com'});
  //     var information = {
  //         action: 'https://securegw-stage.paytm.in/order/process',
  //         params: response
  //     }
  //     // post(information);
  // }

  // useEffect(()=>{
  //     const referralLink=window.location.href.split(`${window.location.origin}/product/${id}/`)[1];
  //     if(referralLink)
  //       localStorage.setItem("Link",referralLink)
  // },[])

  const addReferralCode=async(link)=>{
      const referralCode=link.split(`${window.location.origin}/product/${id}/`)[1];
      if(referralCode){
        const response=await axios.post("http://localhost:8000/addReferralLink",{referralCode:referralCode});
        return response;
      }
      // console.log(referralCode)
  }

  const addReferral=async()=>{
    const referralCode=window.location.href.split(`${window.location.origin}/product/${id}/`)[1];
    if(referralCode){
      await axios.post("http://localhost:8000/addReferral",{referralCode:referralCode});
    }

  }

  const addItemToCart = () => {
    dispatch(addToCart(id, quantity));
    navigate("/cart");
  };

  // onClick={() => buyNow()}
  let userId,userName = "";
  const authToken = localStorage.getItem("token");
  if (authToken) {
    const { id, username } = jwt_decode(authToken);
    userId = id;
    userName = username;
  }

  const generateLink = (length, chars) => {
    if (userId && userName) {
      let result = "";
      for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];
      const link = `${window.location.href}/${
        userId.substring(0, userId.length-21 ) +
        result +
        userId.substring(userId.length-21,)
      }`;
      // console.log(link)
      addReferralCode(link)
      return encodeURI(link)
    } else {
      return window.location.href;
    }
  };

  

  return (
    <LeftContainer>
      <Box
        style={{
          padding: "15px 20px",
          border: "1px solid #f0f0f0",
          width: "90%",
        }}
      >
        <Image src={product.detailUrl} alt="none" />
        <br />
      </Box>

      <StyledButton
        onClick={() => addItemToCart()}
        style={{ marginRight: 10, background: "#ff9f00" }}
        variant="contained"
      >
        <Cart />
        Add to Cart
      </StyledButton>
      <StyledButton
        style={{ background: "#fb641b" }}
        variant="contained"
        onClick={() => addReferral()}
      >
        <Flash /> Buy Now
      </StyledButton>
      <StyledButton
        style={{ background: "#ff9f00", marginTop: "1rem" }}
        variant="contained"
        onClick={() => setLink(generateLink(userName.length, userName))}
      >
        <Share /> Share
      </StyledButton>
      <div>
        <p>Here is your link</p>
        <p
          onClick={() => {
            navigator.clipboard.writeText(link).then(() => {
              // Alert the user that the action took place.
              // Nobody likes hidden stuff being done under the hood!
              alert("Copied to clipboard");
            });
          }}
        >
          {link}
        </p>
      </div>
    </LeftContainer>
  );
};

export default ActionItem;
