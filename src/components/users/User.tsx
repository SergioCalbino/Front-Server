import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useAuthStore from '../../hooks/useAuthStore';


interface IUserProps {
  nombre: string;
  correo: string;
  google: boolean;
  estado: boolean;
  rol: string;
  uid: string;
}

const User = ( user:IUserProps ) => {
  
  const  { onDelete } = useAuthStore()

  type event = React.MouseEvent<HTMLButtonElement>
  const { nombre, correo, google, estado, rol, uid} = user

  const seeGoogle = google === true ? 'true' : false;
  const seeState = estado === true ? 'true' : false;

  
  
  const handleDelete =  (user: IUserProps) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
    
    onDelete(user.uid)

  };
  
  return (
    <div className="flex flex-col">
    <div className="bg-slate-50 shadow-lg rounded-lg overflow-x-auto">
      <table className="table-auto w-full text-center text-sm font-bold">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-4 py-3">uid</th>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Correo</th>
            <th className="px-4 py-3">Usuario Google</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Rol</th>
            <th className="px-4 py-3"><Link to={`edit/${uid}`}>Editar</Link ></th>
            <th className="px-4 py-3"> <button onClick={handleDelete(user)} >Eliminar</button> </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          <tr>
            <td className="px-4 py-3">{uid}</td>
            <td className="px-4 py-3">{nombre}</td>
            <td className="px-4 py-3">{correo}</td>
            <td className="px-4 py-3">{seeGoogle}</td>
            <td className="px-4 py-3">{seeState}</td>
            <td className="px-4 py-3">{rol}</td>
            
          </tr>
          
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default User