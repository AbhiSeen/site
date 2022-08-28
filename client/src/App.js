import "./App.css";
import React from "react";
import Home from "./components/home/Home";
import DataProvider from "./context/DataProvider";
import { Box } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DetailView from "./components/details/DetailView";
import Cart from "./components/cart/Cart";
import Dashboard from "./components/dashboard/Dashboard";
import List from './components/dashboard/list/List'
import Single from './components/dashboard/single/Single'
import New from './components/dashboard/New/New'
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Box>
          <Routes>
            <Route path="/" element={<Home />}/>
              <Route path="/cart" element={<Cart />} />
              <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                <Route path="users">
                  <Route index element={<List />} />
                  <Route path=":userId" element={<Single />} />
                  <Route path="new" element={<New />} />
                </Route>
              </Route>
              <Route path="/product/:id" element={<DetailView />} />
              </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
