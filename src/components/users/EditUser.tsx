import axios from 'axios';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { InterObjAlerta } from '../../types/interfaces';
import Alert from '../../Alert';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
  nombre: boolean;
  rol: string;
  show: boolean
}

const initialAlerta: IEditAlert = {
  estado: false,
  google: false,
  nombre: false,
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

  type changeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement >
  type submitEvent = FormEvent<HTMLFormElement>

  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;


  

    const [editUser, setEditUser] = useState(initialUser);
    const [alerta, setAlerta] = useState({error: false, msg: '', show: false});
    const [alertaCampos, setAlertaCampos] = useState(initialAlerta);

    const { id } = useParams();

    const getUserId = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}`)
        setEditUser(data)
        // console.log(data)
    }

    useEffect(() => {
        getUserId()
      
    }, []);



    const handleChange = (e: changeEvent) => {
      setEditUser({...editUser,
        [e.target.name] : e.target.value,
        
      })
    };

    const handleCheckboxChange = (e: changeEvent) => {
      const target = e.target as HTMLInputElement; // convertir a tipo HTMLInputElement para acceder a 'checked'
      if (target.type === "checkbox" || target.type === "radio") {
        setEditUser({
          ...editUser,
          [target.name]: target.checked,
        });
      } else {
        setEditUser({
          ...editUser,
          [target.name]: target.value,
          rol: target.value
        });
      }
    };

    const editUserOk = async () => {
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
        Swal.fire('Saved!', 'Changes were saved successfully', 'success')
      } else {
        Swal.fire('Changes were not saved', '', 'info')
      }

    }
    
    const handleSubmit = (e:submitEvent) => {
      e.preventDefault()

      if (!editUser.nombre) {
        setAlerta({msg: 'El nombre es obligatorio', error: true, show: true})
        setAlertaCampos((prevState) => ({ ...prevState, nombre: true }))  
        setTimeout(() => setAlertaCampos({ ...alertaCampos, show: false }), 3000)
        return;
    }
      if (!nombreRegex.test(editUser.nombre)) {
        setAlerta({msg: 'El nombre no tiene caracteres validos', error: true, show: true})
        setAlertaCampos((prevState) => ({ ...prevState, nombre: true }))  
        setTimeout(() => setAlertaCampos({ ...alertaCampos, show: false }), 3000)
        return;
      }

      if ( editUser.nombre.length < 3) {
        setAlerta({msg: 'El debe tener mas de tres caracteres', error: true, show: true})
        setAlertaCampos((prevState) => ({ ...prevState, nombre: true }))  
        setTimeout(() => setAlertaCampos({ ...alertaCampos, show: false }), 3000)
        return;
    }

      editUserOk()
      

      
    
      
    }
  
    

  return (
    <>
       <div>
        <h1 className="text-zinc-800 font-bold text-2xl mt-12 gap-10 p-5">
          Editar <span className="text-red-600">Usuario</span>
        </h1>
   
      
      

    {/* Renderiza un mensaje de error para campos vacíos si alertaCampos.campoVacio es verdadero */}
  
    
        <div  className=' mx-auto mt-20 w-96 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
    { alertaCampos.nombre && <Alert alerta={alerta} />}
    
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
              <select className='rounded-md w-full py-2 px-3 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"' 
                  value={editUser.rol} onChange={handleCheckboxChange} >
                  <option value="ADMIN_ROLE">ADMIN_ROLE</option>
                  <option value="USER_ROLE">USER_ROLE</option>
              </select>
              
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