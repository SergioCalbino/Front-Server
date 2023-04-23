import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../models";
import { userInfo } from "os";
import { clearLocalStorage, persistLocalStorage } from "../../utilities";



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


export const UserKey = 'user'

export const userSlice = createSlice({
    name: 'user',
    initialState: EmptyUserState,
    
    reducers: {
        loginUser: (state, action ) => {
            return {
                uid: action.payload.usuario.uid,
                nombre: action.payload.usuario.nombre,
                correo: action.payload.usuario.correo,
                password: '',
                img: '',
                rol: action.payload.usuario.rol,
                estado: true,
                google: true,
                token: action.payload.token
            }
        },
        createUser: (state, action) => {
            return persistLocalStorage<UserInfo>(UserKey, action.payload)
        },
        updateUser: (state, action) => {
            return persistLocalStorage<UserInfo>(UserKey,{ ...state, ...action.payload })
        },
        resetUser: () => {
            clearLocalStorage(UserKey)
            return EmptyUserState
        }
    }
});

export const { loginUser, createUser, updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;