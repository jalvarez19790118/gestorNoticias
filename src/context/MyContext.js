import React, {createContext, useState,useEffect} from 'react';
import clienteAxios from '../config/axios';

export const MyContext = createContext();

const MyProvider = (props) => {

  

    const [allResults,setAllResults] = useState([]);
    const [loadingNews,setLoadingNews] = useState(false)
    const [news,setNews] = useState([]);
    const [type, setType] = useState(null);
    const [size, setSize] = useState(20);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    

    const [wwidth, setWwidth] = useState(window.innerWidth);
    const [wheight, setWheight] = useState(window.innerHeight);



    const updateOnpanelSize= () => {
        
        setWwidth(window.innerWidth);
        setWheight(window.innerHeight)

     };

    useEffect(() => {
        window.addEventListener("resize", updateOnpanelSize);
        return () => window.removeEventListener("resize", updateOnpanelSize);
    });


    const obtieneNoticias = async(tipo) => {
        try {
 
           
          
                const respuesta = await clienteAxios.get(`/${tipo}?_sort=fh_public&_order=desc&_page=${currentPage}&_limit=${size}`);
                const respuesta2 = await clienteAxios.get(`/total_${tipo}`);

                setNews(respuesta.data);
            
                 let total  = respuesta2.data[0].total;
                 let total_pages = parseInt(total / size);
                
                 setAllResults(total);

                 if (total - (total_pages * size) > 0 ) total_pages +=1;
               
                 setPages(total_pages) 
                 setLoadingNews(false);

        } catch (error) {

            console.log(error);
        }
    }


    const setNewSize = (newSize) => {
        if (newSize.length === 0 ) return null;
       
        setCurrentPage(1);
       setSize(newSize);
      
    };

    const setNewCurrentPage = (newSize) => {
        
        setCurrentPage(parseInt(newSize));
   
     };
 

    const refreshNewsData = (tipo) => {
      if (!loadingNews) setLoadingNews(true);
        setType(tipo);
        obtieneNoticias(tipo);

    };


    return (

        <MyContext.Provider
            value={{
            news,
            allResults,
            loadingNews,
            refreshNewsData,
            size,
            setNewSize,
            type,
            setType,
            pages,
            currentPage,
            setNewCurrentPage,
            wwidth,
            wheight
            
        }}>
            {props.children}
        </MyContext.Provider>
    )

}

export default MyProvider;