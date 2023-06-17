import { useState } from 'react';

import PersonPinRoundedIcon from '@mui/icons-material/PersonPinRounded';
import { Typography, Menu, MenuItem, Box, styled } from '@mui/material';
import { PowerSettingsNew } from '@mui/icons-material';
import {logout} from "../service/api";
import { useNavigate } from 'react-router-dom';

const Component = styled(Menu)`
    margin-top: 5px;
`;

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
`;

const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(false);
    const navigate=useNavigate();
    
    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
        //
    };

    const logoutUser = async() => {
       
         const response=await logout(localStorage.getItem("token"));
         console.log({response})
        if (response) {
            localStorage.clear();
            localStorage.removeItem("accountUser");
            let newdata = localStorage.getItem("accountUser")!=="guest" ? localStorage.getItem("accountUser") : "" ;
            // setStore()
            console.log(newdata)
            setAccount(newdata);
            navigate("/")
        }
        handleClose();
    }
    
    return (
        <>
            <Box onClick={handleClick}>
                <Typography style={{ marginTop: '5px' ,cursor :'pointer',color:'#6855e0', display:'flex',verticalAlign:'center'}}>    
                    <PersonPinRoundedIcon/> <span style={{marginLeft:'4px'}}>{account}</span>
                </Typography>
            </Box>
            <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {   logoutUser();}}>
                    <PowerSettingsNew fontSize='small' color='primary'/> 
                    <Logout>Logout</Logout>
                </MenuItem>
            </Component>
        </>
    )    
}

export default Profile;
