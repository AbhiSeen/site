import "./App.css";
import React from "react";
import Home from "./components/home/Home";
import DataProvider from "./context/DataProvider";
import { Box } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DetailView from "./components/details/DetailView";
import Cart from "./components/cart/Cart";
import Dashboard from "./components/dashboard/Dashboard";
import List from "./components/dashboard/list/List";
import Single from "./components/dashboard/single/Single";
import New from "./components/dashboard/New/New";
import ProductList from "./components/dashboard/productList/ProductList";
import NewProduct from "./components/dashboard/newProduct/NewProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewPro from "./components/dashboard/viewpro/ViewPro";
import OrderList from "./components/dashboard/orderlist/OrderList";
// import Earn from "./components/home/Earn";
import About from "./components/OtherPage/About";
import ContactPage from "./components/OtherPage/ContactPage";
import FAQPage from "./components/OtherPage/FAQPage";
import ReturnPolicy from "./components/OtherPage/ReturnPolicy";
import CategoryDetail from "./components/details/CategoryDetail";
import ReferNdEarn from "./components/OtherPage/ReferandEarn";
import Wallet from "./components/home/Wallet";
import TopOffers from "./components/details/TopOffers";
import Mobile from "./components/details/Mobile";
import Fashion from "./components/details/Fashion";
import Electronics from "./components/details/Electronics";
import HomeDecor from "./components/details/HomeDecor";
import Appliances from "./components/details/Appliances";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/users"
              element={
                <ProtectedRoute>
                  <List />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/users/:userId"
              element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/users/new"
              element={
                <ProtectedRoute>
                  <New />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/products/:productId"
              element={
                <ProtectedRoute>
                  <ViewPro />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/products/newpro"
              element={
                <ProtectedRoute>
                  <NewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route path="/product/:id" element={<DetailView />} />
            <Route path="/About" element={<About />} />
            <Route path="/ContactUs" element={<ContactPage />} />
            <Route path="/FAQ" element={<FAQPage />} />
            <Route path="/ReturnPolicy" element={<ReturnPolicy />} />
            <Route path="/CategoryDetail" element={<CategoryDetail />} />
            <Route path="/TopOffers" element={<TopOffers />} />
            <Route path="/Mobile" element={<Mobile />} />
            <Route path="/Fashion" element={<Fashion />} />
            <Route path="/Electronics" element={<Electronics />} />
            <Route path="/HomeDecor" element={<HomeDecor />} />

            <Route path="/Appliances" element={<Appliances />} />
            <Route path="/Wallet" element={<Wallet />} />
            <Route path="/contactUs" element={<ContactPage />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
