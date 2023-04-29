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
            return persistLocalStorage<UserInfo>(UserKey, action.payload)
        },
        updateUser: (state, action) => {
            return persistLocalStorage<UserInfo>(UserKey,{ ...state, ...action.payload })
        },
        resetUser: () => {
            
            return EmptyUserState
        }
    }
});

export const { loginUser, createUser, updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;