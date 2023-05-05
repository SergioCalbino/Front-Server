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
            return action.payload
        },
        createUser: (state, action) => {
            return action.payload
        },
        updateUser: (state, action) => {
            return { ...state, ...action.payload }
        },
        deleteUser: (state, action) => {
            return  state 
        },
        resetUser: () => {
            
            return EmptyUserState
        }
    }
});

export const { loginUser, createUser, updateUser, resetUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;