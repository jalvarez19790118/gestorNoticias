import React, {createContext, useState, useEffect} from 'react';
import clienteAxios from '../config/axios';

export const MyContext = createContext();

const MyProvider = (props) => {

    const obtieneNoticias = async() => {
        try {

            const respuesta = await clienteAxios.get('/noticias');
            cargaNoticias(respuesta.data);

        } catch (error) {

            console.log(error);
        }
    }

    const [noticias,
        cargaNoticias] = useState([]);

    useEffect(() => {
        obtieneNoticias();
    }, [])

    return (

        <MyContext.Provider value={{
            noticias
        }}>
            {props.children}
        </MyContext.Provider>
    )

}

export default MyProvider;