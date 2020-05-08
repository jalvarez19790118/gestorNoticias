import React, {createContext, useState, useEffect} from 'react';
import clienteAxios from '../config/axios';

export const MyContext = createContext();

const MyProvider = (props) => {

    const obtieneNoticias = async() => {
        try {

            const respuesta = await clienteAxios.get('/noticias?_sort=fh_public&_order=desc');
            cargaNoticias(respuesta.data);

        } catch (error) {

            console.log(error);
        }
    }
    

    const obtieneAlertas = async() => {
        try {

            const respuesta = await clienteAxios.get('/alertas?_sort=fh_public&_order=desc');
            cargaAlertas(respuesta.data);

        } catch (error) {

            console.log(error);
        }
    }


    const [noticias,
        cargaNoticias] = useState([]);

    const [alertas,
        cargaAlertas] = useState([]);

    useEffect(() => {
        obtieneNoticias();
        obtieneAlertas();
    }, [])

    return (

        <MyContext.Provider value={{
            noticias,
            alertas
        }}>
            {props.children}
        </MyContext.Provider>
    )

}

export default MyProvider;