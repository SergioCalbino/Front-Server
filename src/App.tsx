import { Suspense, lazy, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css'
import AuthLayout from './layout/AuthLayout';

import Register from './pages/Register';
import Products from './components/products/Products';
import CreateProduct from './components/products/CreateProduct';
import { PrivateRoutes, PublicRoutes } from './models';
import AuthGuard from './guards/auth.guard';
import Dashboard from './admin/Private';
import { RoutesNotFound } from './utilities';
import { SideBar } from './admin';
// import Private from './admin/Private';

const Login = lazy(() => import('./pages/Login'))
const Private = lazy(() => import('./admin/Private'))

function App() {


  return (
    <>
      <div>

        <Suspense fallback={<>Cargando</>} >

          <BrowserRouter>
            <RoutesNotFound>

              <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE} />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route element={<AuthGuard />} >

                <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />

              </Route>
              {/* <Route path="forget-password" element={<ForgetPassword/>} />
            </Route>
             */}

            </RoutesNotFound>
          </BrowserRouter>
        </Suspense>
      </div>
    </>
  )
}

export default App
