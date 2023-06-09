
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom'

import Product from './Product'
import { useSelector } from 'react-redux'
import { AppStore } from '../../redux/store'
import { InterProducts } from './interface.product'



const Products = () => {

  const userState = useSelector((store: AppStore) => store)
    // console.log(userState)

    const productObj: InterProducts = {
        productos: [{
        categoria: {
            nombre: '',
            _id: ''
        },
        disponible: true,
        img: '',
        nombre: '',
        precio: '',
        usuario: '',
        _id: ''
        }]
    }

    const [products, setProducts] = useState(productObj)
    const token = localStorage.getItem('token')

    const getProducts = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/productos`)
        setProducts(data)
    }
    useEffect(() => {
        getProducts()

      
    }, [])
    

  return (
    <>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4 mt-32">
  {products &&
    products.productos.map((product) => (
      <Product key={product.nombre} {...product} />
    ))}
</div>

    <div className='m-10 lg:flex lg:justify-between'>
  <Link to='/admin' className='lg:flex lg:justify-between lg:mt-11 md:w-auto w-full cursor-pointer rounded-x bg-blue-500 hover:bg-blue-600 rounded-xl mt-10 md:mt-6 sm:mt-6 p-3 uppercase text-white'>
    Perfil Admin
  </Link>
</div>
    
    </>
  )
}

export default Products