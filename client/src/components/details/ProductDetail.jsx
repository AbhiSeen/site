import { useState } from 'react';
import { Box, Typography, Table, TableBody, TableRow, TableCell, styled } from '@mui/material';
import { LocalOffer as Badge } from '@mui/icons-material';
import { ShoppingCart as Cart, FlashOn as Flash, Share } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import { payUsingPaytm } from '../../service/api';
// import { post } from '../../utils/paytm';
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import "./CategoryCard.css";

const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: baseline;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`

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



    return (
        <div className='p-5 px-10 w-full'>
            <h1 className='text-3xl text-violet-800 capitalize text-left'>{product.name}</h1>
            <div className='text-xl text-indigo-800 font-medium font-normal'><s>${product.mrp}</s> ${price}</div>
            <div className='text-base text-red-500 font-medium  '>You Save {product.discount} %</div>
            <p className='text-indigo-900 text-sm border-b-indigo-500 capitalize'>{product.description}</p>
            <hr className='my-1'/>
            <div className='flex row my-4'>
                <button className="button-24"
                // onClick={() => addReferral()}
                >Buy Now <ShoppingCartCheckoutRoundedIcon/></button>            
                <button
                    onClick={() => addItemToCart()}
                className="button-81"
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
        </div>
    )
}

export default ProductDetail;
