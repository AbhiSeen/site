import React from 'react'
import "./OrderList.scss";
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import List from "../table/Table";

function OrderList() {
  return (
    <div className='home'>
         <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
        <h1 className="title">List of Orders</h1>
          <List/>
        </div>
      </div>
    </div>
  )
}

export default OrderList