//Esto lo hacmos para hacer persistente los datos del usuario

export const persistLocalStorage = <t>(key: string, value: t) => {
    localStorage.setItem(key, JSON.stringify({ ...value  }))
};

export const clearLocalStorage = (key: string) => {
    localStorage.removeItem(key)
}