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

import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './CategoryCard.css'
import { logout } from '../service/api';



const productStyle ={
     width:"400px" ,
    height:'400px !important'
}

 
const ActionItem = ({ product }) => {
    const navigate = useNavigate();
    const { _id :id} = product;
    const productImage=[`${product.image.url}`,`${product.image.url}`,`${product.image.url}`];
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const indicators = (index) => (
        <img src={product.image.url} className="indicator productStyle" alt="none" /> 
    );
    
    // const buyNow = async () => {
        //     let response = await payUsingPaytm({ amount: 500, email: 'codeforinterview01@gmail.com'});
        //     var information = {
            //         action: 'https://securegw-stage.paytm.in/order/process',
            //         params: response    
            //     }
            //     // post(information);
            // }
            // console.log(product.productImage)
            
    const addItemToCart =  () => {
        dispatch(addToCart(id, quantity));
        navigate('/cart');
    }

    // onClick={() => buyNow()}
  

  return (    
    // <div className='shadow-md bg-slate-50 rounded-md p-6 w-96  box-border flex justify-center flex-col items-center'>    
   
    // <CarouselProvider 
    //     naturalSlideWidth={100}
    //     naturalSlideHeight={125}
    //     totalSlides={3}
    //     orientation="horizontal"
    //     //  className='divide-y-2'
    //   >
    //     {/* {console.log(product)} */}
    //     <Slider className='' style={{backgoroundColor:'red'}}>
    //         <Slide index={0} style={{backgoroundColor:'red'}}>
    //             <img src={product.image.url} width="500px" height="320px" style={{padding:"0px",}}   alt="none" />
    //         </Slide>
    //         <Slide index={1}>
    //             <img src={product.image.url} width="500px" height="320px" style={{padding:"0px",}}   alt="none" />
    //         </Slide>
    //         <Slide index={2}>
    //             <img src={product.image.url} width="500px" height="320px" style={{padding:"0px",}}   alt="none" />
    //         </Slide>
    //     </Slider>
    //     <div>
    //     <Dot slide={0} className='mx-3 focus:outline-none focus:ring focus:ring-blue-400 focus:rounded p-1'>
    //     <span aria-hidden="true"> 
    //         <img src={product.image.url} width="80px" height="80px" style={{padding:"0px"}}   alt="none" />
    //     </span>
    //     <span className="sr-only"></span>
    //     </Dot>
    //     <Dot slide={1}  className='mx-3 focus:outline-none focus:ring focus:ring-blue-400 focus:rounded  p-1'>
    //     <span aria-hidden="true"> <img src={product.image.url} width="80px" height="80px" style={{padding:"0px"}}   alt="none" /></span>
    //     <span className="sr-only"></span>
    //     </Dot>
    //     <Dot slide={2} className='mx-3 focus:outline-none focus:ring focus:ring-blue-400 focus:rounded  p-1'>
    //     <span aria-hidden="true"> <img src={product.image.url} width="80px" height="80px" style={{padding:"0px"}}   alt="none" /></span>
    //     <span className="sr-only"></span>
    //     </Dot>
    //     </div>
    //   </CarouselProvider> 
    //   </div>
    <div className='productSlider'>
     <Zoom indicators={indicators} scale={1.1}>
        {
            productImage.map((each, index) => 
                <img src={each} style={{height:'350px',width:'300px'}} key={index}   alt="none" />
            )
        }
    </Zoom>
    </div>
  );
};

export default ActionItem;
 