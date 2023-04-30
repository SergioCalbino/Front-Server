import axios from 'axios';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { InterObjAlerta } from '../../types/interfaces';
import Alert from '../../Alert';
import { Link } from 'react-router-dom';

interface IEditUser {
  correo: string;
  estado: boolean;
  google: boolean;
  nombre: string;
  rol: string
  uid: string
};

interface IEditAlert {
  estado: boolean;
  google: boolean;
  nombre: string;
  rol: string;
  show: boolean
}

const initialAlerta: IEditAlert = {
  estado: false,
  google: false,
  nombre: '',
  rol: '',
  show: false 
}

const initialUser: IEditUser = {
  correo: '',
  estado: true || false,
  google: true || false,
  nombre: '',
  rol: '',
  uid: '',
}

const EditUser = () => {

  type changeEvent = React.ChangeEvent<HTMLInputElement>
type submitEvent = FormEvent<HTMLFormElement>

  

    const [editUser, setEditUser] = useState(initialUser);
    const [alerta, setAlerta] = useState({error: false, msg: '', show: false});
    const [alertaCampos, setAlertaCampos] = useState(initialAlerta);

    const { id } = useParams();

    const getUserId = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}`)
        setEditUser(data)
        console.log(data)
    }

    useEffect(() => {
        getUserId()
      
    }, [])

    const handleChange = (e: changeEvent) => {
      setEditUser({...editUser,
        [e.target.name] : e.target.value,
        
      })
    };

    const handleCheckboxChange = (e: changeEvent) => {
      setEditUser({
        ...editUser,
        [e.target.name]: e.target.checked
      });
    };

    const handleSubmit = async (e:submitEvent) => {
      e.preventDefault()
      const { data } = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}`, editUser)
      console.log(data)
    }
    

  return (
    <>
       <div>
        <h1 className="text-zinc-800 font-bold text-2xl mt-12 gap-10 p-5">
          Registrate <span className="text-red-600">Llenando el formulario</span>
        </h1>
   
      
      

    {/* Renderiza un mensaje de error para campos vacíos si alertaCampos.campoVacio es verdadero */}
    {alertaCampos.nombre && <Alert alerta={{ error: true, msg: 'El nombre es obligatorio' }} />}
      {/* Renderiza un mensaje de error para una contraseña corta si alertaCampos.passwordCorto es verdadero */}
    {alertaCampos.estado && <Alert alerta={{ error: true, msg: 'El email es obligatorio' }} />}
      {/* Renderiza un mensaje de error para una contraseña corta si alertaCampos.passwordCorto es verdadero */}
      {alertaCampos.google && <Alert alerta={{ error: true, msg: 'La contraseña debe tener más de 6 caracteres' }} />}
      {/* Renderiza un mensaje de error para contraseñas que no coinciden si alertaCampos.passwordNoCoincide es verdadero */}
      {alertaCampos.rol && <Alert alerta={{ error: true, msg: 'Las contraseñas no coinciden' }} />}
      {/* Renderiza un mensaje de error genérico si alerta.error es verdadero */}
    
        <div  className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          <form onSubmit={handleSubmit} className="mr-8 md:ml-8">
          
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
              <input
                className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                type="text"
                placeholder="Nombre Completo"
                name="nombre"
                value={editUser.nombre}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Rol
              <input
                className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                type="text"
                placeholder="Rol"
                name="rol"
                value={editUser.rol}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
          
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Estado
              <input
                className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                type='checkbox'
                name="estado"
                checked={editUser.estado}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
          
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Google User
              <input
                className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                type="checkbox"
                name="google"
                checked={editUser.google}
                onChange={handleCheckboxChange}
              />
            </label>
        
          </div>
          


          <input
            type="submit"
            value="Edit User"
            className="bg-sky-800 hover:bg-sky-900 text-white py-3 px-10 w-full cursor-pointer rounded-xl uppercase mt-5 md:w-auto "
          />
        </form>
        
        <nav className="mt-10 lg:flex lg:justify-between ">
          <Link
            className="block text-center my-5 text-gray-500"
            to={"side-bar"}
          >
            {" "}
            Volver al Panel de Admin{" "}
          </Link>

        
        </nav>
    </div>
    </div>

    </>
  )
}

export default EditUser