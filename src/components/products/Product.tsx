import React from 'react'
import { InterProducts } from '../../types/interfaces';

const Product = (product: any) => {
  
   const { nombre, precio, categoria, _id, usuario, img, disponible } = product;

  return (
    <div className='flex flex-wrap justify-around mb-4'>
      <div className='card rounded-md shadow-md p-2' style={{ width: '300px' }}>
        <img src={product.img} alt='' className='w-full h-48 object-cover' />
        <div className='px-4 py-2'>
          <p className='text-gray-600 font-semibold uppercase text-sm'>Producto</p>
          <p className='text-gray-800 font-bold text-xl mb-1'>{nombre}</p>
          <p className='text-gray-600'>Categoría:</p>
          <p className='text-gray-800 font-bold text-xl mb-1'>{product.categoria.nombre}</p>
        </div>
        <div className='px-4 py-2'>
          <p className='text-gray-600'>Usuario: <span className='text-gray-800 font-bold'>{product.usuario?.nombre}</span></p>
          <p className='text-gray-600'>Precio: <span className='text-gray-800 font-bold'>$ {precio}</span></p>
          <p className='text-gray-600'>Disponibilidad: <span className='text-gray-800 font-bold'>{disponible ? 'Si' : 'No'}</span></p>
        </div>
      </div>
    </div>
  )
}

export default Product