import React from 'react'
import { Box ,styled ,Typography} from '@mui/material';
import {navData} from '../constants/data';
import { useNavigate} from 'react-router-dom';


const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '70px 130px 0 130px !important',
    overflowX: 'overlay',
    [theme.breakpoints.down('lg')]: {
        margin: '0px !important'
    }
}))

const Container = styled(Box)`
    padding: 12px 8px;
    text-align: center
`

const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
`;

const Button = styled(Box)`
    background-color:transparent;
    border:none;
    cursor:pointer;

`

const NavBar = () => {
    const navigate = useNavigate();
    
    const CategoryDetail = () => {
      // 👇️ navigate to /contacts
      navigate('/CategoryDetail');
    };
    
  return (
    <Component>{
        navData.map(data => (
            <Container>
                <Button onClick={CategoryDetail}>
                 <img src={data.url} alt="NavBar" style={{  width: 64 }} />
                 <Text>{data.text}</Text>
                </Button>
            </Container>  
        ))
        }
      </Component>
  )
}

export default NavBar

