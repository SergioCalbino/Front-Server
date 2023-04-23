import React from 'react'
import { InterProducts } from '../../types/interfaces';

const Product = (product: any) => {
  
   const { nombre, precio, categoria, _id, usuario, img, disponible } = product;

  return (
    <>
    {/* <div className='flex flex-wrap justify-around mb-4'>
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
    </div> */}



    
    

    
    <div className="  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full md:w-auto">
        <img src={product.img} alt='' className=' py-3 w-full h-48 object-cover' />
        <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nombre: {nombre}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Categoria: {product.categoria.nombre}</p>
            <p className='text-gray-600'>Usuario: <span className='text-gray-800 font-bold'>{product.usuario?.nombre}</span></p>
            <p className='text-gray-600'>Precio: <span className='text-gray-800 font-bold'>$ {precio}</span></p>
            <p className='text-gray-600'>Disponibilidad: <span className='text-gray-800 font-bold'>{disponible ? 'Si' : 'No'}</span></p>
            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>
</div>


    </>
  )
}

export default Product