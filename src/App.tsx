import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css'
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './components/products/Products';
import CreateProduct from './components/products/CreateProduct';
import { PrivateRoutes, PublicRoutes } from './models';
import AuthGuard from './guards/auth.guard';
import Dashboard from './admin/Dashboard';
import Modal from './admin/Modal';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>

            //Rutas publicas
            {/* <Route path="/" element={<AuthLayout/>} /> */}
            {/* si esta logeuado, va al private, si no esta logueado, lo mando al loguien */}
            <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE}/>} />
            <Route path={PublicRoutes.LOGIN} element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="/products" element={<Products/>} />

            //Rutas privadas. el * permite que todas pasen por el Guard
            <Route element={<AuthGuard/>} >

                <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Modal/>} />
            </Route>
            {/* <Route path="forget-password" element={<ForgetPassword/>} />
            </Route>
             */}
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
