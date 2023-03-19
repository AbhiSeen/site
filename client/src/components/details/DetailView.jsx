import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../redux/actions/productActions';
import { styled, Box, Typography, Grid } from '@mui/material';
import ActionItem from './ActionItem';
import ProductDetail from './ProductDetail';
import Header from '../header/Header';
const Component = styled(Box)`
    margin-top: 55px;
    height: 92vh;
`;

const Container = styled(Grid)(({ theme }) => ({
    // background: '#FFFFFF',
    // display: 'flex',
    // [theme.breakpoints.down('md')]: {
    //     margin: 0
    // }
}))

const RightContainer = styled(Grid)`
// background-color: #fff0da;  
// height:88vh;
// padding: 25px 0 0 40px;
//     margin-top: 25px;
//     & > p {
//         margin-top: 10px;
//     }
`;

const DetailView = () => {

    const { id } = useParams();

    const { product } = useSelector(state => state.getProductDetails);

    // console.log(product)
    const dispatch = useDispatch();
    useEffect(() => {
        if(product && id !== product._id)   
            dispatch(getProductDetails(id));
    }, [ id]);
  return (
    <div style={{backgroundColor:'#fff'}} className='box-border h-screen'>
        <Header/>
        {product && Object.keys(product).length &&
            <div className=' flex detail-view'> 
                <Grid item lg={4} md={4} sm={8} xs={12}>
                    <ActionItem product={product} />
                </Grid>
                <div className='w-full'>
                    <ProductDetail product={product} />
                </div>
            </div>
        }   
    </div>
  )
}

export default DetailView
