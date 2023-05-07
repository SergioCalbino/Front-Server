import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import user, { deleteUser, loginUser, updateUser } from '../redux/states/user'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { IEditUser, InterObjUser } from '../components/users'


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

	const onDelete = async (id:string) => {
		console.log(id)
		const shouldDelete = await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		  }).then((result) => {
			return result.isConfirmed
		  })
		
		  if (shouldDelete) {
			  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}`,config)
				.then(res => {
				dispatch(deleteUser(res.data))
				navigate('/admin')
			})
			.catch(err => console.log(err))
			
		  } else {
			Swal.fire('User were not eliminate', '', 'info')
		  }
	};

	const onEditUser = async (id: string | undefined, editUser: IEditUser) => {
		const shouldSave = await Swal.fire({
			title: 'Do you want to save the changes?',
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: 'Save',
			denyButtonText: `Don't save`,
		  }).then((result) => {
			return result.isConfirmed
		  })
		
		  if (shouldSave) {
			await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}`, editUser)
			.then(res => {
				dispatch(updateUser(res.data))
				Swal.fire('Saved!', 'Changes were saved successfully', 'success')
				navigate('/admin')
			})
		  
		  } else {
			Swal.fire('Changes were not saved', '', 'info')
		  }

	}

	

	return {
		StartLogin,
		onRegister,
		onDelete,
		onEditUser
	}
}

export default useAuthStore