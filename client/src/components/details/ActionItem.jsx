import { useState } from 'react';
import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash, Share } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import { payUsingPaytm } from '../../service/api';
// import { post } from '../../utils/paytm';
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';


const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    // height:'100%',
    padding: '5rem 0 0 25px',
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

const ActionItem = ({ product }) => {
    const navigate = useNavigate();
    const { id } = product;
        
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
    // console.log(product.productImage)

    const addItemToCart = () => {
        dispatch(addToCart(id, quantity));
        navigate('/cart');
    }

    // onClick={() => buyNow()}
  

  return (
    <LeftContainer>
      <Box
        style={{
          border: "1px solid #f0f0f0",
          width: "90%",
        }}
      >
        <Image src={product.productImage? `data:${product.image.contentType};base64,${product.productImage}`:''} width="500px" height="250px" style={{padding:"0px"}} alt="none" />
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
        // onClick={() => addReferral()}
      >
        <Flash /> Buy Now
      </StyledButton>
      <StyledButton
        style={{ background: "#ff9f00", marginTop: "1rem" }}
        variant="contained"
        // onClick={() => setLink(generateLink(userName.length, userName))}
      >
        <Share/>
      </StyledButton>
      <div>
        <p>Here is your link</p>
        <p
          onClick={() => {
            // navigator.clipboard.writeText(link).then(() => {
            //   // Alert the user that the action took place.
            //   // Nobody likes hidden stuff being done under the hood!
            //   alert("Copied to clipboard");
            // });
          }}
        >
          {/* {link} */}
        </p>
      </div>
    </LeftContainer>
  );
};

export default ActionItem;
