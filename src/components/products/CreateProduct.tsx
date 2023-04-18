import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react'
import { InterCreateProduct } from '../../types/interfaces';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';




const CreateProduct = () => {

  const userId = useSelector((store : AppStore) => store)
  console.log(userId.user.uid)

    type changeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    type submitEvent = FormEvent<HTMLFormElement>
    const token = localStorage.getItem('token')


    const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-token': token, // Aquí se pasa el token en los encabezados
        },
      };

    const objProduct: InterCreateProduct = {
        nombre: '',
        estado: true,
        usuario: userId.user.uid,
        precio: '',
        categoria: '',
        descripcion: '',
        disponible: true,
        img: '#'
    
      }
    
      const [reg, setReg] = useState(objProduct);
      const [alerta, setAlerta] = useState({error: false, msg: '', show: false});

      const [categories, setCategories] = useState<{ _id: string | number, nombre: string }[]>([])

      

      //Me traigo las categorias
      const getCategories = async () =>{

          const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categorias`)
          setCategories(data.categorias)
          // console.log(categories)
          // console.log(data.categorias)
          
      }

      useEffect(  () => {
        getCategories()
        
      }, [])
      

      
      const createProducto = async () => {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/productos`, reg, config)
        console.log(data)
      }
    

    //   const handleCategorie = () => {
    //       const categoriId = e.target.value
    //       categoria: categoriId

    //   }

      const handleChange = (e:changeEvent) => {
        setReg({...reg,
          [e.target.name] : e.target.value,
        })
      };
    
      
      const handleSubmit = (e:submitEvent) => {
        e.preventDefault();
    

        // const { nombre, correo, password, repPassword } = reg
    
        // if ([nombre,correo, password, repPassword].includes('')) {
        //   setAlerta({msg: 'Hay campos vacios', error: true})
        //   return
        // };
        
        // if (password.length < 6) {
        //   setAlerta({msg: 'La contraseña debe tener mas de 6 caracteres', error: true})
        //   return
        // }
    
        // if (password !== repPassword ) {
        //   setAlerta({msg: 'Los password no son iguales', error: true})
        //   return
          
        // }
    
        createProducto()
        setReg(objProduct)
    
    
      }
      
     
      return (
        <>
        
          <div  className='  mt-20 mb  md:mt-5   shadow-lg px-5 py-10 rounded-xl  bg-white'>
              <form onSubmit={handleSubmit} className="mr-8 md:ml-8">
              
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nombre
                  <input
                    className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                    type="text"
                    placeholder="Nombre del producto"
                    name="nombre"
                     value={reg.nombre}
                    onChange={handleChange}
                  />
                </label>
              </div>

        
              
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                precio
                  <input
                    className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                    type="number"
                    placeholder="Precio"
                    name="precio"
                    value={reg.precio}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
               ID Usuario
                  <input
                    className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                    type="text"
                    placeholder="Usuario"
                    name="usuario"
                     value={reg.usuario}
                    onChange={handleChange}
                    disabled
                  />
                </label>
              </div>
              
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                descripcion
                  <textarea
                    className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                   
                    placeholder="Descripcion del producto"
                    name="descripcion"
                    value={reg.descripcion}
                    onChange={handleChange}
                  />
                </label>
            
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                descripcion
                  <textarea
                    className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                   
                    placeholder="Descripcion del producto"
                    name="descripcion"
                    value={reg.descripcion}
                    onChange={handleChange}
                  />
                </label>
            
              </div>
              
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Elegir Categoria
                   <select id="select-example" name='categoria' value={reg.categoria} onChange={handleChange}>
                        <option value="">-- Selecciona una opción --</option>
                        { categories && categories.map( (categorie) => (
                                <option key={categorie._id} value={categorie._id} > {categorie.nombre} </option>
                            ))}
                        
                    </select>
                </label>
            
              </div>
    
    
              <input
                type="submit"
                value="Crear Producto"
                className="bg-sky-800 hover:bg-sky-900 text-white py-3 px-10 w-full cursor-pointer rounded-xl uppercase mt-5 md:w-auto "
              />
            </form>
            </div>

            {/* <div>
            <h1 className=" fixed -ml-3.5 text-zinc-800 font-bold text-2xl mt-12 gap-10 p-5">
              Crear <span className="text-red-600">Productos</span>
            </h1>
        </div> */}
            </>
      )
}

export default CreateProduct