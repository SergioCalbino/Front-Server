
//Interface para register
export interface InterObjUser {
    nombre: string;
    correo: string;
    password: string;
    repPassword: string;
    rol:'USER_ROLE'
}

export interface InterObjAlerta  {
    mailVacio: boolean;
    nombreVacio: boolean;
    passwordCorto: boolean;
    pNoCoincide: boolean,
    show: boolean
}

//Interface para Products

export interface InterProducts {
    productos: {
    categoria: {
        nombre: string,
        _id: string,
    },
    disponible: boolean,
    img: string,
    nombre: string,
    precio: string,
    usuario: string,
    _id: string
    }[]
}

//Crear Producto

export interface  InterCreateProduct  {
    nombre: string,
    estado: boolean,
    usuario: string,
    precio: number,
    categoria: string,
    descripcion: string,
    disponible: boolean,
    img: string

  }
