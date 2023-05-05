//Crear usuario
export interface InterObjUser {
    nombre: string;
    correo: string;
    password: string;
    repPassword: string;
    rol:'USER_ROLE'
}

//Usuarios
export interface IUser {
    total?: number | null | undefined;
    usuarios: {
        nombre: string;
        correo: string;
        google: boolean;
        estado: boolean;
        rol: string;
        uid: string;

    }[]
}

//Editar usuario
export interface IEditUser {
    correo: string;
    estado: boolean;
    google: boolean;
    nombre: string;
    rol: string
    uid: string
  };