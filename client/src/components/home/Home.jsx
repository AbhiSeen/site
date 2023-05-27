import { useEffect } from 'react'
import { Fragment } from 'react';
import NavBar from './NavBar';
import Banner from './Banner';
import { Box ,styled} from '@mui/material';
import { getProducts } from '../../redux/actions/productActions';
import { useSelector } from 'react-redux';
import Slide from './Slide';
import MidSlide from './MidSlide'; 
import MideSection from './MidSection';
import Footer from './Footer';
import Header from '../header/Header';
const Component = styled(Box)`

padding:10px;
background:#F2F2F2;
padding-top:5rem;
`

const Home = () => {
  const { products } = useSelector(state => state.getProducts)
  useEffect(() => {
   getProducts()
  }, [products])

  return (
    <Fragment>
      {/* <Header/> */}
      <Component>

        <Banner />
      <NavBar />
        <MidSlide products={products}  title="Men's Fashion"/>
        {/* <MideSection/> */}
        <Slide products={products} title="Men's Fashion" timer={false}/>
        <Slide products={products} title="Kids Wear's" timer={false}/>
        <Slide products={products} title="Home Decor" timer={false}/>
      </Component>
      <Footer/>
    </Fragment>
  )
}

export default Home

