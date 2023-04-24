import { Outlet, Navigate } from "react-router-dom";
import Header from "../pages/Header";
import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";

const ProtectRoutes = () => {

    const adminUser = useSelector((store: AppStore) => store)

  return (
    <>
    

        <Header/>
            { adminUser.user.rol === "ADMIN_ROLE" ? (
                <main className="container mx-auto mt-10" >
                <Outlet /> 

                </main> 
                ) : <Navigate to='/'/> }
        {/* <Footer/> */}
      
    </>
  );
};

export default ProtectRoutes;