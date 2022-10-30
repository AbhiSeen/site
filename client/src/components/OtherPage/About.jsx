import React from 'react'
import "./About.css";
import AboutUspageHd from "../images/AboutUspageHd.png";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';
import Footer from '../home/Footer';



const About = () => {
  return (
    <>
      <div className='aboutUsPage'>
        <img  className='aboutUsImg' src={AboutUspageHd}/>        
        <div className="aboutUstext">
            <span className="text-gray-500 border-b-2 border-indigo-600 ">About Us</span>
            <div className='about-underline'></div>
            <h2 className="font-bold text-3xl my-4 sm:text-4xl colorBlack">About <span className="text-indigo-600 font-bold">AMFashion</span></h2>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, 
            commodi doloremque, fugiat illum magni minus nisi nulla numquam obcaecati placeat quia, 
            repellat tempore voluptatum.</p>
        </div>
      </div>
        <div  className='aboutUsfeatures'>
          <h2 className="font-bold text-3xl my-4 sm:text-4xl text-indigo-600 whatWeDoTitle">What We <span className=" font-bold colorBlack">Do </span></h2>
          <div className='doDiv'>
              <div className='whatweDo-div'>
                <ShoppingCartCheckoutIcon className='sendBtn' />
                <h3 className='featureTitle'>Fast Delivery</h3>
                <p className='featureCon'>We are your lightning-fast delivery partner.</p>
              </div>
              <div className='whatweDo-div'>
                <AssuredWorkloadIcon className='sendBtn3' />
                <h3 className='featureTitle'>Secured Payments</h3>
                <p className='featureCon'>Payments are more secure than ever in online shopping with us.</p>
              </div>
              <div className='whatweDo-div'>
                <VerifiedIcon className='sendBtn2' />
                <h3 className='featureTitle'>Verified Sellers</h3>
                <p className='featureCon'>Best Sellers across India brings you the best and latest fashion at your door step.</p>
              </div>
              <div className='whatweDo-div'>
                <TouchAppRoundedIcon className='sendBtn1' />
                <h3 className='featureTitle'>Discounted Price</h3>
                <p className='featureCon'>Affordable Fashion at yout Fingertips.</p>
              </div>
          </div>
        </div>
        <Footer/>
    </>

  )
}

export default About