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
import { RoutesNotFound } from './utilities';
import { SideBar } from './admin';


function App() {
  

  return (
    <>
    <BrowserRouter>
      <RoutesNotFound>
      
            <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE}/>} />
            <Route path={PublicRoutes.LOGIN} element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="/products" element={<Products/>} />
            <Route element={<AuthGuard/>} >

                <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<SideBar/>} />
                <Route path={`${PrivateRoutes.CREATEPRODUCT}/*`} element={<CreateProduct/>} />
            </Route>
            {/* <Route path="forget-password" element={<ForgetPassword/>} />
            </Route>
             */}
     
      </RoutesNotFound>
    </BrowserRouter>
  </>
  )
}

export default App
