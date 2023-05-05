import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { loginUser } from '../redux/states/user'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { InterObjUser } from '../components/users'


const useAuthStore = () => {
	const [alerta, setAlerta] = useState({ error: false, msg: '' })
	
	const token = localStorage.getItem('token')
	const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-token': token, // Aquí se pasa el token en los encabezados
        },
      };
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const StartLogin = async (correo: string | undefined, password: string | undefined) => {
		await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { correo, password })
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
					token: res.data.token
				}))
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
	};

	const onRegister = async(reg: InterObjUser) => {
		await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, reg)
		.then(res => {
		  localStorage.setItem('token', res.data.token)
		  Swal.fire({
			position: 'center',
			icon: 'success',
			title: `Gracias por registrate en nuesto sitio`,
			showConfirmButton: true,
		  })
		  navigate('/products')
		})
		.catch(err => 
		  Swal.fire({
			position: 'center',
			icon: 'error',
			title: `el ${ err.response.data.errors[0].msg }`,
			showConfirmButton: true,
		  }))
		
	};

	const onDelete = async (id: string) => {
		await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}`,config)
	}

	return {
		StartLogin,
		onRegister,
		onDelete
	}
}

export default useAuthStore