import React from 'react'
import "./OrderList.scss";
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import Transactionstable from "../table/Transactionstable";

function OrderList() {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="bottom">
        <h1 className="title">List of Orders</h1>
        <Transactionstable />
        </div>
        </div>
        </div>
  )
}

export default OrderList