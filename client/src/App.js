// import logo from './logo.svg';
import './App.css';
import React from 'react'
import Header from './components/header/Header';
import Home from './components/home/Home';
import DataProvider from './context/DataProvider';
import { Box } from '@mui/material';
import {  Routes , Route, MemoryRouter,Navigate,useNavigate } from 'react-router-dom';
import DetailView from './components/details/DetailView';
import Cart from './components/cart/Cart';
import Dashboard from './components/dashboard/Dashboard';



function App() {
  return (
    <DataProvider>
      <MemoryRouter >
        <Box >
        <Header />
          <Routes>
          <Route path= '/' element={<Home />} />
          <Route path= '/cart' element={<Cart />} />
          <Route path= '/dashboard' element={<Dashboard />} />
          <Route path= '/product/:id' element={<DetailView />} />
          </Routes>
        </Box>
      </MemoryRouter>
    </DataProvider>
  );
}

export default App;
