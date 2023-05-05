import axios from 'axios'
import React, { useEffect, useState } from 'react'
import User from './User'
import { IUser } from './interface.user'






const Users = () => {

    const userObj : IUser = {
        total: null ,
    usuarios: [{
        nombre: '',
        correo: '',
        google: false || true,
        estado: false || true,
        rol: '',
        uid: '',

    }]
    }

    const [userApi, setUserApi] = useState(userObj)
    

    const getUsers = async () => {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`)
        // console.log(data)
        setUserApi(data)
       

    }

    useEffect(() => {
        getUsers()
      
    }, [])
    

  return (
    <>
         
    {
      userApi && userApi.usuarios.map((user, index) => (

            <User
            key={index}
            {...user}
            
            />
        ))

    }



</>

  )
}

export default Users