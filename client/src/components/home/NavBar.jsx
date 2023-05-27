import React from 'react'
import { Box ,styled ,Typography} from '@mui/material';
import {navData} from '../constants/data';
import { useNavigate} from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";

const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap:'wrap',
    justifyContent: 'space-between',
    margin: '1.5rem 2.5rem 0 2.5rem !important',
    overflowX: 'overlay',
    overflow: 'hidden',
    [theme.breakpoints.down('lg')]: {
        margin: '0px !important'
    }
}))

const Container = styled(Box)`
    // padding: 12px 8px;
    text-align: center;
    background-color:rgb(104, 85, 224);
    border-radius:10px;
    height:12.5rem;
    width:10rem;
    cursor:pointer;
    &:hover {
        transform: scale(0.97);
    }

    &:active {
        transform: scale(0.97);
    }

`

const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
`;
const categoryTitle={
    fontSize:'22px',
    fontWeight:600,
    margin:'1rem 0 0 1rem',
}

const Button = styled(Box)`
    // background-color:green;
    border:none;
    cursor:pointer;
    display:flex;
    flex-direction:column;
    align-items:center;
    justigfy-content:space-evenly;
   overflow:hidden;

`
const categoryName={
    color:'white',
}

const categoryImage= {  width: 140 }
const NavBar = () => {
    const navigate = useNavigate();


    const CategoryDetail = (page,e,data) => {
        console.log({e},data)
    
    const pageUrl= page;
      console.log({navigate})
      navigate('/CategoryPage',{state:{data}});
    };
    
  return (
    <>
        <div style={categoryTitle}>Popular Categories</div>
    <Component>
        {
        navData.map((data) => (
            <Container key={data.id}>
                <Button onClick={(e)=>CategoryDetail(data.page,e,data)}>
                    <LazyLoadImage src={data.url}
                        width={140} height={160}
                        alt="Image Alt"
                    />
                </Button>
            </Container>  
        ))
    }
      </Component>
      </>
  )
}

{/* <img src={} alt="NavBar" style={categoryImage} /> */}
{/* <Text style={categoryName}>{data.text}</Text> */}
export default NavBar

