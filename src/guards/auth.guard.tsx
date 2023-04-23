import React from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '../redux/store';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../models';
import { persistLocalStorage } from '../utilities';

export const AuthGuard = () => {

    const navigate = useNavigate()
    const userState = useSelector((store: AppStore) => store)
    console.log(userState.user.rol)

 
    // return userState.user.rol === 'ADMIN_ROLE' ? <Outlet/> : <Navigate replace to={PublicRoutes.LOGIN} />

  
}

export default AuthGuard