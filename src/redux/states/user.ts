import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../models";

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
            return action.payload
        },
        updateUser: (state, action) => {
            return { ...state, ...action.payload }
        },
        resetUser: (state, action) => {
            return EmptyUserState
        }
    }
});

export const { loginUser, createUser, updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;