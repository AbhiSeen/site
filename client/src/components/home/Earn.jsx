import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Earn() {
  const [earnings,setEarnings]=useState(0);
  axios.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const getEarnings=async()=>{
    const response=await axios.get("http://localhost:8000/getEarnings")
    setEarnings(response.data.earnings??0);
  }

  useEffect(()=>{
    getEarnings();
  },[]);
  
  return (
    <div>You have earned Rs.{earnings}</div>
  )
}

export default Earn