import React, {createContext, useState} from 'react';
import clienteAxios from '../config/axios';

export const MyContext = createContext();

const MyProvider = (props) => {

  //  let { id } = props.match.params;

    const obtieneNoticias = async(tipo) => {
        try {


                const respuesta = await clienteAxios.get(`/${tipo}?_sort=fh_public&_order=desc`);
                setNews(respuesta.data);
                setLoadingNews(false);


            

        } catch (error) {

            console.log(error);
        }
    }


    const [loadingNews,
        setLoadingNews] = useState(false)

    
    const [news,
        setNews] = useState([]);

        const [type,
            setType] = useState(null);
    

    const refreshNewsData = (tipo) => {
      if (!loadingNews) setLoadingNews(true);
        obtieneNoticias(tipo);

    };


    return (

        <MyContext.Provider
            value={{
            news,
            loadingNews,
            refreshNewsData,
          
            type,
            setType
        }}>
            {props.children}
        </MyContext.Provider>
    )

}

export default MyProvider;