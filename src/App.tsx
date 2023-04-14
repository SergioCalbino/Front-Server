import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
    
            <Route path="/" element={<AuthLayout/>} />
            <Route index element={<Login/>} />
            <Route path="register" element={<Register/>} />
            {/* <Route path="forget-password" element={<ForgetPassword/>} />
            </Route>
            <Route path="/products" element={<Products/>} />
            <Route path="/create-product" element={<CreateProduct/>} /> */}
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
