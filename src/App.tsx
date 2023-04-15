import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './components/products/Products';
import CreateProduct from './components/products/CreateProduct';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
    
            <Route path="/" element={<AuthLayout/>} />
            <Route index element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/create-product" element={<CreateProduct/>} />
            {/* <Route path="forget-password" element={<ForgetPassword/>} />
            </Route>
             */}
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
