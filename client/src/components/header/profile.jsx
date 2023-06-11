import { useState } from 'react';


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
            setAccount(newdata);
            navigate("/")
        }
    }
    
    return (
        <>
            <Box onClick={handleClick}><Typography style={{ marginTop: 2 ,cursor :'pointer',color:'#6855e0',verticalAlign:'center'}}>{account}</Typography></Box>
            <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {  handleClose(); logoutUser();}}>
                    <PowerSettingsNew fontSize='small' color='primary'/> 
                    <Logout>Logout</Logout>
                </MenuItem>
            </Component>
        </>
    )    
}

export default Profile;
