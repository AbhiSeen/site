import React from 'react'
import './DashHome.scss'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import Widget from '../widget/Widget'
import Featured from '../featured/Featured'
import Chart from '../chart/Chart'
import { List } from '@mui/material'
import '../style/dark.scss';
import {  useEffect, useState } from "react";
import { getOrders ,getUsersList} from "../../service/api";
import Transactionstable from '../table/Transactionstable'


const DashHome = () => {
  const [number,setNumber] = useState({
    numberofUsers:0,
    numberofOrders:0,
    earnings:0,
  });

  const getNumbers=async()=>{
    const [firstResponse, secondResponse] = await Promise.all([
      setOrdersfromApi(),
      setUsersfromApi()
    ]);
    setNumber({...number,numberofUsers:secondResponse,numberofOrders:firstResponse});
  }

  const setOrdersfromApi = async () => {
      const {orders:ordersArray} = await getOrders(window.location.pathname.split("/")[3]);
      const numberofOrders=ordersArray.reduce((prevVal,current)=>prevVal+=current.orders.length,0);
      return numberofOrders;
  };

  const setUsersfromApi=async()=>{
    const response=await getUsersList();
    return response.length
  }

  useEffect(()=>{
    getNumbers();
  },[]);

  return (
    <div className='home'>
         <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" value={number.numberofUsers}/>
          <Widget type="order" value={number.numberofOrders}/>
          <Widget type="earning" value={number.earnings}/>
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Transactionstable />
        </div>
      </div>


    </div>
  )
}

export default DashHome