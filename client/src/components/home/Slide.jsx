import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';
import { Button, Divider, Box, Typography, styled } from '@mui/material';
import "./Wallet.css";

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
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    display: flex;    
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
`
const ViewAllButton = styled(Button)`
    // margin-left: auto;
    background-color: #2874f0;
    border-radius: 2px;
    font-size: 12px;
`;

const Image = styled('img')({
    width: 'auto',
    height: 150
})


const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px
`
const Slide = ({ products ,title }) => {
    console.log(products);
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
    const renderer = ({ hours, minutes, seconds }) => {
        return <RenderTimer variant="span">{hours} : {minutes} : {seconds}  Left</RenderTimer>;
    };
    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                {/* {
                    timer && <Timer>
                                <img src={timerURL} style={{ width: 24 }} alt='time clock' />
                                <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                        </Timer>
                } */}
                <ViewAllButton variant="contained" color="primary">View All</ViewAllButton>
            </Deal>
            <Divider />
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
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    products && products?.length>0 &&
                    products.map(product => (
                        <Link to={`product/${product?._id}`} style={{textDecoration: 'none'}} key={product?._id}  div className="product-card">
                            <div class="product-tumb">
                                <Image src={product?.productImage? `data:${product?.image?.contentType};base64,${product?.productImage}`:''} alt='product' />
                            </div>
                            <div class="product-details">
                                <span class="product-catagory">Women,bag</span>
                                <h4><a href="">{product?.name}</a></h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                                <div class="product-bottom-details">
                                    <div class="product-price">
                                        {/* <small>$96.00</small> */}
                                        {product?.discount}% off</div>
                                    <div class="product-links">
                                        <a href=""><i class="fa fa-heart"></i></a>
                                        <a href=""><i class="fa fa-shopping-cart"></i></a>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }

            </Carousel>
        </Component>
    )
}

export default Slide

{/*


    <!-- 		<div class="badge">Hot</div> -->
<Link to={`product/${product?._id}`} style={{textDecoration: 'none'}} key={product?._id}  className="listItemBox">
<Box textAlign="center" style={{ padding: '50px' }}>
    <Image src={product?.productImage? `data:${product?.image?.contentType};base64,${product?.productImage}`:''} alt='product' />
    <Text style={{ fontWeight: 600, color: '#212121' }}>{product?.name}</Text>
    <Text style={{ color: 'green' }}>{product?.discount}% off</Text>
    <Text style={{ color: '#212121', opacity: '.6' }}>{product.tagline}</Text>
</Box>
</Link> */}