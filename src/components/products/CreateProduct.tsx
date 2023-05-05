import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react'
import { InterObjAlerta } from '../../types/interfaces';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import Alert from '../../Alert';
import { InterCreateProduct } from './interface.product';


interface InterProductAlert {
  nombre: boolean;
  precio: boolean;
  img?: boolean;
  descripcion: boolean;
  categoria: boolean;
  show: boolean
}



const CreateProduct = () => {

  const userId = useSelector((store : AppStore) => store)
  // console.log(userId.user.uid)

    type changeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    type submitEvent = FormEvent<HTMLFormElement>
    const token = localStorage.getItem('token')
    // const token = userId.user.token
    // console.log(token)


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
        precio: 0,
        categoria: '',
        descripcion: '',
        disponible: true,
        img: ''
  };

    const initialAlerta: InterProductAlert = {
      nombre: false,
      precio: false,
      img: false,
      descripcion: false,
      categoria: false,
      show: false
  };
    

      const [productState, setProductState] = useState(objProduct);
      const [alerta, setAlerta] = useState({error: false, msg: '', show: false});
      const [alertaCampos, setAlertaCampos] = useState(initialAlerta);
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
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/productos`, productState, config)
        console.log(data)
      }

      const handleChange = (e:changeEvent) => {
        setProductState({...productState,
          [e.target.name] : e.target.value,
        })
      };
    
      
      const handleSubmit = (e:submitEvent) => {
        e.preventDefault();
    

        const { nombre, precio, descripcion, img, categoria } = productState
    
        if (!nombre) {
          setAlerta({msg: 'El nombre es obligatorio', error: true, show: true})
          setAlertaCampos((prevState) => ({ ...prevState, nombre: true }))  
          setTimeout(() => setAlertaCampos({ ...alertaCampos, show: false }), 3000)
        return
          
        }
        
        if (!precio || precio < 0) {
          setAlerta({msg: 'El precio es boligatorio y debe ser mayor a cero', error: true, show: true})
          setAlertaCampos((prevState) => ({ ...prevState, precio: true }))  
          setTimeout(() => setAlertaCampos({ ...alertaCampos, show: false }), 3000)
        return
        }
    
        if (!descripcion ) {
          setAlerta({msg: 'La descripcion del prodcuto es obligatoria', error: true, show: true})
          setAlertaCampos((prevState) => ({ ...prevState, descripcion: true }))  
          setTimeout(() => setAlertaCampos({ ...alertaCampos, show: false }), 3000)
        return
          
        }
        if (!categoria ) {
          setAlerta({msg: 'Debe seleccionar una categoria', error: true, show: true})
          setAlertaCampos((prevState) => ({ ...prevState, categoria: true }))  
          setTimeout(() => setAlertaCampos({ ...alertaCampos, show: false }), 3000)
        return
          
        }
    
        createProducto()
        setProductState(objProduct)
    
    
      }
      
     
      return (
        <>
        
            {alertaCampos.nombre && <Alert alerta={{ error: true, msg: 'El nombre es obligatorio' }} />}
            {alertaCampos.precio && <Alert alerta={{ error: true, msg: 'Debes ingresar un precio' }} />}
            {alertaCampos.descripcion && <Alert alerta={{ error: true, msg: 'La descripcion es obligatoria' }} />}
            {alertaCampos.categoria && <Alert alerta={{ error: true, msg: 'Debes elegir una categoria' }} />}
            {/* {alertaCampos.nombre && <Alert alerta={{ error: true, msg: 'El nombre es obligatorio' }} />} */}
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
                     value={productState.nombre}
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
                    value={productState.precio}
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
                     value={productState.usuario}
                    onChange={handleChange}
                    disabled
                  />
                </label>
              </div>
              
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
               Imagen
                  <input
                    className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                    type="text"
                    placeholder="Imagen"
                    name="img"
                     value={productState.img}
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
                    value={productState.descripcion}
                    onChange={handleChange}
                  />
                </label>
            
              </div>
              
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Elegir Categoria
                   <select id="select-example" name='categoria' value={productState.categoria} onChange={handleChange}>
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