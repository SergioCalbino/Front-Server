
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom'
import { InterProducts } from '../../types/interfaces'
import Product from './Product'
import { useSelector } from 'react-redux'
import { AppStore } from '../../redux/store'



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
    <div className="grid grid-cols-4 gap-x-4 gap-y-4 mt-32" >
  { 
  products && products.productos.map(product => (
            <Product 
                key={product.nombre}
                {...product}
            />
  
            ))
            
          }
          </div>

    <div className=' m-10 lg:flex lg:justify-between' >
    <Link to='/admin' className=' lg:flex lg:justify-between md:w-auto w-full cursor-pointer rounded-x bg-blue-500 hover:bg-blue-600 rounded-xl mt-10 p-3 uppercase text-white'> 
      Crear Producto 
    </Link>
    </div>
    </>
  )
}

export default Products