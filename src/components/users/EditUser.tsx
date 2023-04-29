import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditUser = () => {

    const { id } = useParams();
    console.log(id)

    const getUserId = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}`)
        console.log(data)
    }

    useEffect(() => {
        getUserId()
      
    }, [])
    

  return (
    <div>EditUser</div>
  )
}

export default EditUser