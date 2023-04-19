
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom'
import { InterProducts } from '../../types/interfaces'
import Product from './Product'


const Products = () => {

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
    <div className='flex flex-wrap mt-24 bg-slate-100'>
        
  { 
  products && products.productos.map(product => (
    <div className='w-full sm:w-1/2 md:w-1/3 xl:w-1/4 '>
            <Product 
                key={product.nombre}
                {...product}
            />
        </div>

    ))

    }
    </div>
    <div className=' m-10 lg:flex lg:justify-between' >
    <Link to='/private/sidebar' className=' lg:flex lg:justify-between md:w-auto w-full cursor-pointer rounded-x bg-blue-500 hover:bg-blue-600 rounded-xl mt-10 p-3 uppercase text-white'> 
      Crear Producto 
    </Link>
    </div>
    </>
  )
}

export default Products