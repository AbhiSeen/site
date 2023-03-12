import { Typography, Box, styled } from '@mui/material';
import Empty from './Empty.svg';
import './empty.css'

const EmptyCart = () => {   
    return (
        <div className='emptyBox'>
            <img src={Empty} className="emptyCartImg"/>
            <div className='text-2xl text-violet-500 font-bold'>Your cart is empty !</div>
            <Typography component="span" className='text-gray-600'>It looks like you have not made your choice yet.</Typography>
        </div>
    )
}

export default EmptyCart;