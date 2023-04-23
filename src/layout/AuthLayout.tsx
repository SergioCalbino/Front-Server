import { Outlet } from "react-router-dom"



//El Oulet me habilita todos los componentes hijos de Layout
const AuthLayout = () => {
  return (
   <>
   {/* //Aplicamos todo el estilo a la pagina */}
      
    <main className="container mx-auto mt-10 items-center " > 
        <Outlet/> 
    </main>
   </>
  )
}

export default AuthLayout