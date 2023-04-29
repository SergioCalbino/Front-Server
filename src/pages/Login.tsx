import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, useState, FormEvent  } from "react";
import Alert from '../Alert'
import { loginUser } from "../redux/states/user";

// import Alert from "../Alert"
import Swal from "sweetalert2"
import { useDispatch } from "react-redux";
import useAuthStore from "../hooks/useAuthStore";



const Login = () => {

    type changeEvent = React.ChangeEvent<HTMLInputElement>
    type submitEvent = FormEvent<HTMLFormElement>

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { StartLogin } = useAuthStore()
	const [correo, setCorreo] = useState<string | undefined>('')
	const [password, setPassword] = useState<string | undefined>('')
	const [alerta, setAlerta] = useState({error: false, msg: ''})
	
	
	const login = async() => {

		StartLogin( correo, password )
			// await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {correo, password})
			// .then(res => {
			// 	dispatch(loginUser(res.data))
			// 	console.log(res.data.usuario)
			// 	localStorage.setItem('token', res.data.token)
			// 	Swal.fire({
			// 		position: 'center',
			// 		icon: 'success',
			// 		title: `Bienvenido ${res.data.usuario.nombre}`,
			// 		showConfirmButton: true,
			// 	})
			// 	navigate('/products')
			// })
			// .catch(err => 
			// setAlerta({
			// 	msg: err.response.data.msg,
			// 	error: true
			// }))
	}

	const handleSubmit = (e:submitEvent) => {
		e.preventDefault()

		if (!correo || !password) {
			return setAlerta({msg: 'Todos Los campos son obligatorios', error: true})
		}

		login()

	}

 	

  return (
    <>
		
        <div>
          <h1  className="text-zinc-800 font-bold text-2xl mt-12  " >
            Inicia Sesion y <span className="text-red-600" >Administra tus productos</span>
          </h1>
       
        
		{alerta.error && <Alert alerta={{ error: true, msg: 'Ocurrió un error al iniciar sesión' }} />}

        <div  className=' mx-auto mt-20 w-96 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                <form onSubmit={handleSubmit} className="mr-8 md:ml-8">
				<div className="my-5" >
					<label 
						className="uppercase text-gray-600 block text-xl font-bold"
					 >
						Email
						<input
							className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
							type="email"
							placeholder="Email de registro"
							value={correo}
							onChange={(e: changeEvent) => setCorreo(e.target.value)}
						/>
					</label>
				</div>
				<div className="my-5" >
					<label 
						className="uppercase text-gray-600 block text-xl font-bold"
					 >
						Password
						<input
							className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
							type="password"
							placeholder="Ingresa tu password"
							value={password}
							onChange={(e: changeEvent) => setPassword(e.target.value)}

						/>
					</label>
				</div>

				<input
					type="submit"
					value="Inicia Sesion"
					className="bg-sky-800 hover:bg-sky-900 text-white py-3 px-10 w-full cursor-pointer rounded-xl uppercase mt-5 md:w-auto "
				/>
			</form>
			<nav className="mt-10 lg:flex lg:justify-between " >
				<Link 
				   className="block text-center my-5 text-gray-500"
				to={'/register'}> Registrate </Link>
				
                <Link 
                   className="block text-center my-5 text-gray-500"
                to={'/forget-password'}> Olvide Password </Link>
			</nav>
        </div>
		</div>

    </>
  )
}

export default Login