import axios from 'axios'
import React, { useEffect, useState } from 'react';
import "./Wallet.css";
import WalletImg from "../images/WalletImg.png"
import Header from '../header/Header';


const Wallet = () => {
  const [earnings,setEarnings]=useState(0);
  axios.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const getEarnings=async()=>{
    const response=await axios.get("http://localhost:8000/getEarnings",{withCredentials:true})
    setEarnings(response.data.earnings??0);
  }

  useEffect(()=>{
    getEarnings();
  },[]);

  return (
    <>
    {/* <Header /> */}
    <div className="ReferAndEarn">
      <h1 className="ReferHeading">Add Money to your Wallet.</h1>
      <h3 className="ReferSubHeading">
        The more friends you refer or share, the more money you make.
      </h3>
      <img src={WalletImg} className='walletImg'/>
      <div className='earning'>You Have Earned &#x20b9; <span className='money'> {earnings} </span>  </div>
      <button  className="LearnMoreBtn">
        <a className="mcnButton moreBtn" title="Learn more" href="" target="_blank">
          Withdraw Now
        </a>
      </button>
    </div>
    </>
  );
};

export default Wallet;
