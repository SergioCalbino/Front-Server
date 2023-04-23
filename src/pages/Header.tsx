import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserKey, resetUser } from "../redux/states/user";
import { useDispatch } from "react-redux";
import { clearLocalStorage } from "../utilities";

function Header() {
  const [isOpen, setIsOpen] = useState(false);


 const dispatch = useDispatch()
  
 const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    dispatch(resetUser())
   
  }

  return (
    <>
    <nav className=" fixed inset-x-0 top-0 flex items-center justify-between flex-wrap bg-blue-600 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Cafe Server
        </span>
      </div>
      <div className="block lg:hidden">
        
        <button
          id="boton"
          className="flex items-center ju px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          onClick={toggleMenu}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      
      <div
        id="menu"
        className={`${
          isOpen ? "" : "hidden"
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className=" flex justify-center text-sm lg:flex-grow lg:items ">
          {/* <Link to="sidebar"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Docs
          </Link> */}
          <a
            href="#examples"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Examples
          </a>
          <a
            href="#blog"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
            Blog
          </a>
        </div>
        <div>
          <button
            // onClick={logout}
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            Cerra Sesion
          </button>
        </div>
      </div>
        
    </nav>
    
    </>
    
  );
}

export default Header;