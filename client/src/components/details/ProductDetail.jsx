import { useState } from 'react';
import { Box, Typography, Table, TableBody, TableRow, TableCell, styled } from '@mui/material';
import { LocalOffer as Badge } from '@mui/icons-material';
import { ShoppingCart as Cart, FlashOn as Flash, Share } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import { payUsingPaytm } from '../../service/api';
// import { post } from '../../utils/paytm';
import jwt_decode from "jwt-decode";
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import "./CategoryCard.css";
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import DiamondIcon from '@mui/icons-material/Diamond';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { logout } from '../service/api';
import LoginDialog from "../login/LoginDialog"

const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: baseline;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`
// const mainDIv = styled.div`
// display:flex;

// '@media(min-width: 800px)': {
//       flex-wrap:wrap
//       }
// `

const ColumnText = styled(TableRow)`
    font-size: 14px;
    vertical-align: baseline;
    & > td {
        font-size: 14px;
        margin-top: 10px;
    }
`

const StyledBadge = styled(Badge)`
    margin-right: 10px;
    color: #00CC00;
    font-size: 15px;
`;

const ProductDetail = ({ product }) => { 
    const date = new Date(new Date().getTime()+(4*24*60*60*1000));
    
    const navigate = useNavigate();
    const { _id :id} = product; 
        
    const [quantity, setQuantity] = useState(1);
    const priceDiscount = ((product.mrp*product.discount)/100);
    const realVal = (product.mrp - priceDiscount);
    const [productDisc, setProductDisc]=useState(priceDiscount);
    const [price, setPrice] = useState(realVal);
    const [open, setOpen] = useState(false);

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
    const redirectToDetailsPage=()=>{
        let loggedIn=false;
        if(localStorage.getItem("accountUser")!=="guest"){
            const token = document.cookie?.split("=")[1];
            if(token){
                const user = jwt_decode(token);
                if(user){
                   loggedIn=true;
                }else{
                    loggedIn=false;
                   
                }
            }
        }
        if(loggedIn){
            //redirect to delivery/payment details page
        }else{
            setOpen(true);
        }

    }

    const addItemToCart = async () =>{
            dispatch(addToCart(id, quantity));
            navigate('/cart');
        
    }
    



    return (
        <>
        <div className='p-5 px-10 w-full flex flex-wrap flex-col mainDIv'>
            <div className='flex flex-col bg-red'>
                <h1 style={{    fontWeight: 500,color:' #000',    fontSize: '2rem',textTransform:'capitalize',}}>{product.name}</h1>
                <p className='text-gray-700 text-sm border-b-gray-500 capitalize'>{product.description}</p>
                <div className='text-2xl text-indigo-700 font-medium '><s>${product.mrp}</s> ${price}</div>
                <div  style={{color:'#c59a2f'}}className='text-base text-red-500 font-medium  '>Now Get upto {product.discount} % off on Trendy Products</div>
                <hr className='my-1'/>
            </div>
            <div className='flex flex-wrap'>
                <button className="button-24"
                onClick={() => redirectToDetailsPage()}
                >Buy Now <ShoppingCartCheckoutRoundedIcon/></button>            
                <button
                className="button-81"
                onClick={() => addItemToCart()}
                >
                    Add to Cart
                    <ShoppingBagOutlinedIcon className='m-1' />
                </button>
                <button  className="button-81"
                    // onClick={() => setLink(generateLink(userName.length, userName))}
                >
                    Share
                    <Share/>
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
                </button>
            </div>

            <div className='flex flex-wrap items-center my-2 py-2'>
                <div className='flex my-4'>
                    <div className='border-dashed border-2 border-indigo-600 p-2 w-12 rounded-md flex  items-center justify-center '><WorkspacePremiumOutlinedIcon/></div>
                    <p className='p-2 mr-6' >100 % Authentic Products </p>
                </div>
                <div className='flex my-4'>
                    <div className='border-dashed border-2 border-indigo-600 p-2 w-12 rounded-md flex  items-center justify-center '><DiamondIcon/></div>
                    <p className='p-2 mr-6'>Trendy Fashion</p> 
                </div>
                <div className='flex my-4'>
                    <div className='border-dashed border-2 border-indigo-600 p-2 w-12 rounded-md flex  items-center justify-center '><LocalOfferIcon/></div>
                    <p className='p-2' >Affordable Price</p> 
                </div>
               
             </div>
        </div>
         <LoginDialog open={open} setOpen={setOpen}/>
        </>
    )
}

export default ProductDetail;
