import { Suspense, lazy, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css'


import Register from './pages/Register';
import Products from './components/products/Products';
import CreateProduct from './components/products/CreateProduct';

import { RoutesNotFound } from './utilities';
import { SideBar } from './admin';
import { useSelector } from 'react-redux';
import { AppStore } from './redux/store';
import AuthLayout from './layout/AuthLayout';
import ProtectRoutes from './guards/ProtectRoutes';
// import Private from './admin/Private';

const Login = lazy(() => import('./pages/Login'))
const Private = lazy(() => import('./admin/Private'))

function App() {

  const adminUser = useSelector((store: AppStore) => store)
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout/>} > 
                <Route index element={<Login/>} />
                <Route path='products' element={<Products/>} />
                <Route path='register' element={<Register/>} />
          </Route>

          <Route path='/admin' element={ <ProtectRoutes/> } >
                    <Route index element={<SideBar/>} />
                    <Route path='create-product' element={<CreateProduct/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
