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