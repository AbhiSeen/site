import React, { useState } from "react";

import { ButtonGroup, Button, styled } from "@mui/material";
import './groupbutton.css';
import { decreaseQuantity, increaseQuantity, incrementQuantity } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const Component = styled(ButtonGroup)`
`;

const StyledButton = styled(Button)`

`;

const GroupButton = ({item}) => {
    const dispatch=useDispatch();

    const handleIncrement = () => {
        dispatch(increaseQuantity(item))
    };

    const handleDecrement = () => {
        dispatch(decreaseQuantity(item))
    };

    return (
        <div className="quantity">
            <button href="#" class="quantity__minus"  onClick={()=>handleDecrement()} disabled={item.quantity == 1}><span>-</span></button>
            <div name="quantity" type="text" className="quantity__input"  disabled>{item.quantity}</div>
            <button href="#" className="quantity__plus" onClick={()=>handleIncrement()}><span>+</span></button>
        </div>
    );
}

export default GroupButton;