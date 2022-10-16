import React from 'react';
import { NavLink } from "react-router-dom";
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RoofingRoundedIcon from '@mui/icons-material/RoofingRounded';
import PriceCheckRoundedIcon from '@mui/icons-material/PriceCheckRounded';
import PermPhoneMsgRoundedIcon from '@mui/icons-material/PermPhoneMsgRounded';
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';



const Footer = () => {
  return (
    <div className='footerCon'>
            <div className="main">
                <div className="col1">
                <h3 className="heading">
                    About the store
                    <div className='header-underline'></div>
                </h3>
                
                <ul>
                    <li>
                    <NavLink exact to="/Home" className='navlink'>
                    <RoofingRoundedIcon className='footer-icons'/><p className='about-sec-con'>Home</p>
                    </NavLink>
                    </li>
                    <li>
                    <NavLink exact to="/About" className='navlink'> 
                    <LiveHelpRoundedIcon className='footer-icons'/><p className='about-sec-con'> About us</p> 
                    </NavLink>
                    </li>
                    <li>
                    <NavLink exact to="/FAQ" className='navlink'> 
                    <ForumRoundedIcon className='footer-icons'/><p className='about-sec-con'> FAQ</p> 
                    </NavLink>
                    </li>
                    <li>
                    <NavLink exact to="/ReturnPolicy" className='navlink'> 
                    <PublishedWithChangesRoundedIcon className='footer-icons'/><p className='about-sec-con'>Return policy</p> 
                    </NavLink>
                    </li>
                    <li>
                    <NavLink exact to="/ContactUs" className='navlink'> 
                    <PermPhoneMsgRoundedIcon className='footer-icons'/> <p className='about-sec-con'>Contact us </p>
                    </NavLink>
                    </li>
                </ul>
                </div>

                <div className="col2">
                <h3 className="heading">
                Make Money with Us
                <div className='header-underline'></div>
                </h3>
                <div className="languages">
                    <NavLink exact to="/ReferandEarn" className='navlink about-sec-money'> 
                    <PriceCheckRoundedIcon className='footer-icons'/><p className='about-sec-con'>Refer and Earn</p>
                    </NavLink>
                </div>
                </div>

                <div className="col3">
                <h3 className="heading">
                    Get in touch
                    <div className='header-underline'></div>
                </h3>
                <div className="social">
               
                    <a href="https://www.facebook.com/" target='blank'>
                    <FacebookIcon className='footer-icons'/>
                    </a>
                    <a href="https://www.instagram.com/" target='blank'>
                    <InstagramIcon className='footer-icons'/>
                    </a>
                    <a href="https://twitter.com/i/flow/login" target='blank'>
                    <TwitterIcon className='footer-icons'/>
                    </a>
                </div>
                </div>
            </div>

            <p className="terms">
                <a href="#">Terms of purchase</a>
                <a href="#">Security and privacy</a>
                <a href="#">Help Center</a>
            </p>
            <p className="terms">
            © 2007-2022 Flipkart.com
            </p>
    </div>

  )
}

export default Footer