import React from 'react';
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { getOrders } from "../../service/api";

function UserTransactionsList() {
    const [data, setData] = useState({});

    const setOrdersfromApi = async () => {
      // if(window.location.pathname.split("/")[3]){
        const response = await getOrders(window.location.pathname.split("/")[3]);
        // console.log(response)
        setData({orders:response.orders,fullName:response.fullName});
    };
  
    
    useEffect(() => {
      setOrdersfromApi();
    }, []);
  
    return (
      // null
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Tracking ID</TableCell>
              <TableCell className="tableCell">Transaction ID</TableCell>
              <TableCell className="tableCell">Product</TableCell>
              <TableCell className="tableCell">Customer</TableCell>
              <TableCell className="tableCell">Order Date</TableCell>
              <TableCell className="tableCell">Delivery Date</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
              <TableCell className="tableCell">Payment Method</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data && data.orders && data.orders.map((order) => (
                <TableRow key={order.id}>
                <TableCell className="tableCell">{order.trackingId}</TableCell>
                <TableCell className="tableCell">{order.orderId}</TableCell>
                  <TableCell className="tableCell">
                    {
                      order.products.map((product)=>(
                        <TableRow>
                          {product.name}
                          <hr/>
                        </TableRow> 
                      ))
                  }</TableCell>
                  <TableCell className="tableCell">{data.fullName}</TableCell>
                  <TableCell className="tableCell">{order.orderDate.split("T")[0]}</TableCell>
                  <TableCell className="tableCell">{order.deliveryDate?order.deliveryDate.split("T")[0]:"Not applicable"}</TableCell>
                  <TableCell className="tableCell">
                    {
                      order.products.map((product)=>(
                        <TableRow>
                          {product.orderValue}
                        </TableRow>
                      ))
                  }</TableCell>
                   <TableCell className="tableCell">COD</TableCell>
                   <TableCell className="tableCell">
                   {
                      order.products.map((product)=>(
                        <TableRow>
                          {product.status || "Not delivered"}
                        </TableRow>
                      ))
                  }
                   </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default UserTransactionsList