import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { loginUser } from '../redux/states/user'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const useAuthStore = () => {
	const [alerta, setAlerta] = useState({error: false, msg: ''})


    // const {  }  = useSelector(store => store)
   const dispatch = useDispatch();
   const navigate = useNavigate()

   const StartLogin = async (  correo : string | undefined , password: string | undefined ) => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {correo, password})
			.then(res => {
				dispatch(loginUser({
					uid: res.data.usuario.uid,
					nombre: res.data.usuario.nombre,
					correo: res.data.usuario.correo,
					password: '',
					img: '',
					rol: res.data.usuario.rol,
					estado: true,
					google: true,
					token: res.data.token}))
				// console.log(res.data.usuario)
				localStorage.setItem('token', res.data.token)
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: `Bienvenido ${res.data.usuario.nombre}`,
					showConfirmButton: true,
				})
				navigate('/products')
			})
			.catch(err => 
			setAlerta({
				msg: err.response.data.msg,
				error: true
			}))
   }

  return {
    StartLogin
  }
}

export default useAuthStore