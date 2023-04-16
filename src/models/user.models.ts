export interface UserInfo {
    uid: string;
    nombre: string;
    correo: string;
    password: string;
    img?: string;
    rol: string;
    estado: boolean;
    google?: boolean;
    token: string;
}