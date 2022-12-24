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

const Transactionstable = () => {
  const rows = [
    {
      id: 1143155,
      transaction_ID: "232323747438",
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
      order_d: "18/09/2022",
      delivery_d: "30/09/2022",
    },
    {
      id: 2235235,
      transaction_ID: "685858986589",
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
      order_d: "18/09/2022",
      delivery_d: "30/09/2022",
    },
    {
      id: 2342353,
      transaction_ID: "545167223974",
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
      order_d: "18/09/2022",
      delivery_d: "30/09/2022",
    },
    {
      id: 2357741,
      transaction_ID: "779456157969",
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
      order_d: "18/09/2022",
      delivery_d: "30/09/2022",
    },
    {
      id: 2342355,
      transaction_ID: "752356596589",
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
      order_d: "18/09/2022",
      delivery_d: "30/09/2022",
    },
  ];

  const [orders, setOrders] = useState([]);

  const setOrdersfromApi = async () => {
    // if(window.location.pathname.split("/")[3]){
      const response = await getOrders(window.location.pathname.split("/")[3]);
      // console.log(response.orders)
      setOrders(response.orders);
    // }
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
          {orders && orders.length>1 &&
            orders.map((nestedOrder) => (
              nestedOrder.orders.map((order,idx)=>(
                <TableRow key={idx}>
                <TableCell className="tableCell">{order.trackingId}</TableCell>
                <TableCell className="tableCell">{order.orderId}</TableCell>
                <TableCell className="tableCell">
                  {
                    order.products.map((product)=>(
                      <TableRow key={idx+2}>
                        {product.name}
                        <hr/>
                      </TableRow> 
                    ))
                }</TableCell>     
                <TableCell className="tableCell">{nestedOrder.fullName}</TableCell>
                <TableCell className="tableCell">{nestedOrder.orders[idx].orderDate.split("T")[0]}</TableCell>
                <TableCell className="tableCell">{nestedOrder.orders[idx].deliveryDate?nestedOrder.orders[idx].deliveryDate.split("T")[0]: "Not applicable"}</TableCell>
                <TableCell className="tableCell">
                  {
                    order.products.map((product)=>(
                      <TableRow key={product.productId}>
                        {product.orderValue}
                      </TableRow>
                    ))
                }</TableCell>
                 <TableCell className="tableCell">COD</TableCell>
                 <TableCell className="tableCell">
                 {
                    order.products.map((product)=>(
                      <TableRow key={product.productId}> 
                        {product.status || "Not delivered"}
                      </TableRow>
                    ))
                }
                 </TableCell>
                  </TableRow>
              ))
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Transactionstable;
