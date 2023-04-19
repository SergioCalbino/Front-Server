import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../models";
import { userInfo } from "os";


export const EmptyUserState: UserInfo = {
    uid: '',
    nombre: '',
    correo: '',
    password: '',
    img: '',
    rol: '',
    estado: true,
    google: true,
    token: ''
}

//Esto lo hacmos para hacer persistente los datos del usuario
export const persistLocalStorageUser = (userInfo: UserInfo) => {
    localStorage.setItem('user', JSON.stringify({ ...userInfo  }))
}
export const clearLocalStorage = () => {
    localStorage.removeItem('user')
}

export const userSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string ) :  EmptyUserState,
    
    reducers: {
        loginUser: (state, action ) => {
            return persistLocalStorageUser ({
                uid: action.payload.usuario.uid,
                nombre: action.payload.usuario.nombre,
                correo: action.payload.usuario.correo,
                password: '',
                img: '',
                rol: action.payload.usuario.rol,
                estado: true,
                google: true,
                token: action.payload.token
            })
        },
        createUser: (state, action) => {
            return persistLocalStorageUser(action.payload)
        },
        updateUser: (state, action) => {
            return persistLocalStorageUser({ ...state, ...action.payload })
        },
        resetUser: () => {
            clearLocalStorage()
            return EmptyUserState
        }
    }
});

export const { loginUser, createUser, updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;