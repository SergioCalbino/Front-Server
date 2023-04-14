import axios from "axios";
import { ChangeEvent, useState, FormEvent  } from "react";
import { Link } from "react-router-dom";
import Alert from '../Alert'


interface InterObjUser {
    nombre: string;
    correo: string;
    password: string;
    repPassword: string;
    rol:'USER_ROLE'
}

interface InterObjAlerta  {
    mailVacio: boolean;
    nombreVacio: boolean;
    passwordCorto: boolean;
    pNoCoincide: boolean,
    show: boolean


}

type changeEvent = React.ChangeEvent<HTMLInputElement>
type submitEvent = FormEvent<HTMLFormElement>

const Register = () => {

  const objUser:InterObjUser = {
    nombre: '',
    correo: '',
    password: '',
    repPassword: '',
    rol:'USER_ROLE'

  }

  const initialAlerta: InterObjAlerta = {
    mailVacio: false,
    nombreVacio: false,
    passwordCorto: false,
    pNoCoincide: false,
    show: false 
}

  const [reg, setReg] = useState(objUser);
  const [alerta, setAlerta] = useState({error: false, msg: '', show: false});
  const [alertaCampos, setAlertaCampos] = useState(initialAlerta);

  
  const register = async () => {
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, reg)
    console.log(data)
  }

  const handleChange = (e:changeEvent) => {
    setReg({...reg,
      [e.target.name] : e.target.value
    })
  };

  
  const handleSubmit = (e:submitEvent) => {
    e.preventDefault();

    const { nombre, correo, password, repPassword } = reg

    if (!nombre) {
      setAlerta({msg: 'El nombre es obligatorio', error: true, show: true})
      setAlertaCampos((prevState) => ({ ...prevState, nombreVacio: true }))  
      setTimeout(() => setAlertaCampos({ ...alertaCampos, show: false }), 3000)
      return
    };
    if (!correo) {
      setAlerta({msg: 'El email es obligatorio', error: true, show: true})
      setAlertaCampos((prevState) => ({ ...prevState, mailVacio: true }))
      setTimeout(() => setAlertaCampos({ ...alertaCampos, show: false }), 3000)

      return
    };
    
    if (password.length < 6) {
      setAlerta({msg: 'La contraseña debe tener mas de 6 caracteres', error: true, show: true})
      setAlertaCampos((prevState) => ({ ...prevState, passwordCorto: true }))
      setTimeout(() => setAlertaCampos({ ...alertaCampos, show: false }), 3000)

      return
    }

    if (password !== repPassword ) {
      setAlerta({msg: 'Los password no son iguales', error: true, show: true})
      setAlertaCampos((prevState) => ({ ...prevState, pNoCoincide: true })) 
      setTimeout(() => setAlertaCampos({ ...alertaCampos, show: false }), 3000)

      
      return
      
    }

    register()
    setReg(objUser)


  }
  

  

  return (
    <>
      <div>
        <h1 className="text-zinc-800 font-bold text-2xl mt-12 gap-10 p-5">
          Registrate <span className="text-red-600">Llenando el formulario</span>
        </h1>
    </div>
      
      

    {/* Renderiza un mensaje de error para campos vacíos si alertaCampos.campoVacio es verdadero */}
    {alertaCampos.nombreVacio && <Alert alerta={{ error: true, msg: 'El nombre es obligatorio' }} />}
      {/* Renderiza un mensaje de error para una contraseña corta si alertaCampos.passwordCorto es verdadero */}
    {alertaCampos.mailVacio && <Alert alerta={{ error: true, msg: 'El email es obligatorio' }} />}
      {/* Renderiza un mensaje de error para una contraseña corta si alertaCampos.passwordCorto es verdadero */}
      {alertaCampos.passwordCorto && <Alert alerta={{ error: true, msg: 'La contraseña debe tener más de 6 caracteres' }} />}
      {/* Renderiza un mensaje de error para contraseñas que no coinciden si alertaCampos.passwordNoCoincide es verdadero */}
      {alertaCampos.pNoCoincide && <Alert alerta={{ error: true, msg: 'Las contraseñas no coinciden' }} />}
      {/* Renderiza un mensaje de error genérico si alerta.error es verdadero */}
    
        <div  className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          <form onSubmit={handleSubmit} className="mr-8 md:ml-8">
          
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
              <input
                className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                type="text"
                placeholder="Nombre Completo"
                name="nombre"
                 value={reg.nombre}
                onChange={handleChange}
              />
            </label>
          </div>
          
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
              <input
                className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                type="email"
                placeholder="Email de registro"
                name="correo"
                value={reg.correo}
                onChange={handleChange}
              />
            </label>
          </div>
          
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
              <input
                className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                type="password"
                placeholder="Ingresa tu password"
                name="password"
                value={reg.password}
                onChange={handleChange}
              />
            </label>
        
          </div>
          
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
               Repetir Password
              <input
                className="border w-full p-3 mt-3 bg-slate-200 rounded-xl "
                type="password"
                placeholder="Ingresa tu password"
                name="repPassword"
                value={reg.repPassword}
                onChange={handleChange}
              />
            </label>
        
          </div>


          <input
            type="submit"
            value="Registrarse"
            className="bg-sky-800 hover:bg-sky-900 text-white py-3 px-10 w-full cursor-pointer rounded-xl uppercase mt-5 md:w-auto "
          />
        </form>
        
        <nav className="mt-10 lg:flex lg:justify-between ">
          <Link
            className="block text-center my-5 text-gray-500"
            to={"/"}
          >
            {" "}
            ¿Ya tenes cuenta?, logueate{" "}
          </Link>

          <Link
            className="block text-center my-5 text-gray-500"
            to={"/forget-password"}
          >
            {" "}
            Olvide Password{" "}
          </Link>
        </nav>
    </div>
    
    </>
  );
};

export default Register;
