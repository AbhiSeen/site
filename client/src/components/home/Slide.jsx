import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';
import { Button, Divider, Box, Typography, styled } from '@mui/material';
import "./Wallet.css";
import TitleName from '../common/TitleName';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
}


const Component = styled(Box)`
    margin-top: 20px;
    background: #f6f6f6;
    // background:red;
`;

const Deal = styled(Box)`
    display: flex;  
    align-items:center;
    justify-content:space-between;  
    padding: 15px 0px;
`

const RenderTimer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

const Timer = styled(Box)`
    color: #7f7f7f;
    margin-left: 10px;
    display: flex;
    align-items: center;
`;

const DealText = styled(Typography)`
    text-align:center;
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    width: 85%;
    padding-left: 106px;
    @media screen and (max-width: 850px) {
        text-align:left;
        padding-left: 10px;
    }
`
const ViewAllButton = styled(Button)`
    margin-right: 1rem;
    color: #8a5fff;
    font-weight:600;
    font-size: 16px;
    @media screen and (max-width: 850px) {
        width:100px;
    }
`;

const Image = styled('img')({
   
    height: 200,
    width: 400,
})


const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px
`
const Slide = ({ products ,title }) => {
    // const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
    // const renderer = ({ hours, minutes, seconds }) => {
    //     return <RenderTimer variant="span">{hours} : {minutes} : {seconds}  Left</RenderTimer>;
    // };

    return (
        <Component>
            <Deal>
                <TitleName title={title}/>
                {/* {
                    timer && <Timer>
                                <img src={timerURL} style={{ width: 24 }} alt='time clock' />
                                <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                        </Timer>
                } */}
                <ViewAllButton>View All <KeyboardArrowRightIcon/></ViewAllButton>
            </Deal>
            {/* <Divider /> */}
            {
                products && products.length>0 &&
                <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                centerMode={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                showDots={false}
                // style={{backgroundColor:'red'}}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                
                    {products.map(product => (
                        <div className='shadow m-2  p-2  bg-white rounded-lg ' key={product._id}>
                        <Link to={`product/${product._id}`} style={{textDecoration: 'none'}} key={product._id} className="product-card ">
                            <Image className='px-2' src={product.image.url} alt='product' />
                            <div className="product-details">
                                <div className='productTitle   capitalize'>{product.name}</div>
                                {/* <div className='text-left w-full font-light px-2 pb-2'>{product.description}</div> */}
                                {/* <div className="product-bottom-details px-2 py-1"> */}
                                    {/* <div style={{color:'#00265d' ,width:'100%', textDecoration: 'line-through'}}>${product.mrp}</div> */}
                                    <div  className="productTitle">$ {(product.mrp-((product.mrp*product.discount)/100))}</div>
                                    {/* <div className="product-price w-full text-right">{product.discount}% off</div> */}
                                {/* </div> */}
                            </div>
                        </Link>
                        </div>
                    ))}

            </Carousel>
        }
        </Component>
    )
}

export default Slide