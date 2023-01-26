import React, { useState } from "react";

import { ButtonGroup, Button, styled } from "@mui/material";
import './groupbutton.css';

const Component = styled(ButtonGroup)`
`;

const StyledButton = styled(Button)`

`;

const GroupButton = () => {
    const [ counter, setCounter ] = useState(1);

    const handleIncrement = () => {
        setCounter(counter => counter + 1 );
    };

    const handleDecrement = () => {
        setCounter(counter => counter - 1 );
    };

    return (
    <div class="quantity">
        <button href="#" class="quantity__minus"  onClick={() => handleDecrement()} disabled={counter == 0}><span>-</span></button>
        <div name="quantity" type="text" class="quantity__input"  disabled>{counter}</div>
        <button href="#" class="quantity__plus" onClick={() => handleIncrement()}><span>+</span></button>
    </div>
    );
}

export default GroupButton;