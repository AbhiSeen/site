import { useState } from 'react';
import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash, Share } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import { payUsingPaytm } from '../../service/api';
// import { post } from '../../utils/paytm';
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const ActionItem = ({ product }) => {
    const navigate = useNavigate();
    const { _id :id} = product;
    // console.log(id)
        
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
    <div className='shadow-md bg-slate-100 rounded-md p-6 w-96  box-border flex justify-center flex-col items-center'>    
   
    <CarouselProvider 
        naturalSlideWidth={600}
        naturalSlideHeight={800}
        totalSlides={3} className='divide-y-2'
      >
        <Slider className=''>
            <Slide index={0}><img src={product.productImage? `data:${product.image.contentType};base64,${product.productImage}`:''} width="500px" height="350px" style={{padding:"0px"}}   alt="none" /></Slide>
            <Slide index={1}><img src={product.productImage? `data:${product.image.contentType};base64,${product.productImage}`:''} width="500px" height="350px" style={{padding:"0px"}}   alt="none" /></Slide>
            <Slide index={2}><img src={product.productImage? `data:${product.image.contentType};base64,${product.productImage}`:''} width="500px" height="350px" style={{padding:"0px"}}   alt="none" /></Slide>
        </Slider>
        <div>
        <Dot slide={0} className='mx-3 focus:outline-none focus:ring focus:ring-blue-400 focus:rounded p-1'>
        <span aria-hidden="true"> <img src={product.productImage? `data:${product.image.contentType};base64,${product.productImage}`:''} width="80px" height="80px" style={{padding:"0px"}}   alt="none" /></span>
        <span className="sr-only"></span>
        </Dot>
        <Dot slide={1}  className='mx-3 focus:outline-none focus:ring focus:ring-blue-400 focus:rounded  p-1'>
        <span aria-hidden="true"> <img src={product.productImage? `data:${product.image.contentType};base64,${product.productImage}`:''} width="80px" height="80px" style={{padding:"0px"}}   alt="none" /></span>
        <span className="sr-only"></span>
        </Dot>
        <Dot slide={2} className='mx-3 focus:outline-none focus:ring focus:ring-blue-400 focus:rounded  p-1'>
        <span aria-hidden="true"> <img src={product.productImage? `data:${product.image.contentType};base64,${product.productImage}`:''} width="80px" height="80px" style={{padding:"0px"}}   alt="none" /></span>
        <span className="sr-only"></span>
        </Dot>
        </div>
      </CarouselProvider>
      {/* </Box> */}
      </div>
  );
};

export default ActionItem;
 