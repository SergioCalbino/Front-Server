import React, { lazy } from "react";
import Modal from "./SideBar";
// import SideBar from './SideBar';
import { RoutesNotFound } from "../utilities";
import { Navigate, Route } from "react-router-dom";
import { PrivateRoutes } from "../models";
import SideBar from "./SideBar";
import CreateProduct from "../components/products/CreateProduct";
// import CreateProduct from "../components/products/CreateProduct";

// const SideBar = lazy(() => import('./SideBar'))
// const CreateProduct = lazy(() => import('../components/products/CreateProduct'))

function Private() {
  return (
    <div>
      <RoutesNotFound>
          <Route path='/' element={<SideBar/>} />
      </RoutesNotFound>
    </div>
  );
}

export default Private;
