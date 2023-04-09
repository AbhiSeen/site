import { Box, Typography, Button, styled } from '@mui/material';
import GroupButton from './GroupButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Component = styled(Box)`
    border-top: 1px solid #d1d1d1;
    display: flex;
`;

const LeftComponent = styled(Box)`
    // margin: 20px; 
    margin:20px 0 20px 20px;
    display: flex;
    flex-direction: column;
    background-color: rgb(238 238 238);
    border-radius: 7px;
    align-items: center;
    justify-content: center;
`;

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    // margin-top: 10px;
`;

const Cost = styled(Typography)`
    font-size: 16px;
    font-weight: 600;
    color: #388E3C;
`;

const MRP = styled(Typography)`
    color: #878787;
`;

const Discount = styled(Typography)`
    color: #388E3C;
`;

const Remove = styled(Button)`
    text-align:center;
    font-size: 12px;
    color: gray;
    &:hover {
    color: red;
  }
`;

const CartItem = ({ item, removeItemFromCart}) => {
    return ( 
            <Component>
            <LeftComponent>
                <img src={item.image.url} alt="product" style={{ height: 120, width: 95 }} />
            </LeftComponent>
            <div className='m-4 w-9/12'>
                <div className='text-black text-xl font-light'>{item.name}</div>
                <SmallText>Seller:RetailNet
                </SmallText>
                <Typography style={{margin: '10px 0'}}>
                    <Cost component="span" >₹{Math.round(item.mrp*item.quantity-(item.mrp*item.quantity*(item.discount/100)))}</Cost>&nbsp;&nbsp;&nbsp;
                    <MRP component="span" ><strike>₹{item.mrp*item.quantity}</strike></MRP>&nbsp;&nbsp;&nbsp;
                    <Discount component="span">{item.discount} %off</Discount>
                </Typography>
                <div className='flex justify-between'>
                <GroupButton item={item}/>
                <Remove onClick={() => removeItemFromCart(item._id)}> <DeleteIcon style={{fontSize:'18px'}}/>Delete </Remove>
                </div>
            </div>
            </Component>
    )
}

export default CartItem;