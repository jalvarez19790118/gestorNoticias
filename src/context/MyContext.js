import React, { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';

export const MyContext = createContext();

const MyProvider = (props) => {
  const [allResults, setAllResults] = useState([]);
  //const [loadingNews, setLoadingNews] = useState(false);
  const [news, setNews] = useState([]);
  const [type, setType] = useState(null);
  const [size, setSize] = useState(20000);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDate, setCurrentDate] = useState(null);
  const [wwidth, setWwidth] = useState(window.innerWidth);
  const [wheight, setWheight] = useState(window.innerHeight);
  const [editarNoticia, setEditarNoticia] = useState(null);
  
  const updateOnpanelSize = () => {
    setWwidth(window.innerWidth);
    setWheight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateOnpanelSize);
    return () => window.removeEventListener('resize', updateOnpanelSize);
  });

  const obtieneNoticias = async (tipo, currentDate) => {


    const d = new Date(currentDate);

    const dtf = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(d);

   const format_data = `${da}-${mo}-${ye}`;


    const data = new Object();
    data.fini = format_data;
    data.ffin =  format_data;

    if (tipo ==='noticias') data.tipos = 1;
    if (tipo ==='alertas')  data.tipos = 2;
    if (tipo ==='pactivos')  data.tipos = 3;


      
      const respuesta = await clienteAxios.post(`/noticias/byDate`, data );
   
    

      if ( respuesta.data.success)
      {
        let newslist = respuesta.data.resultados;
        setNews(newslist);
        setAllResults( respuesta.data.total_resultados);
      }
      else
      {
        console.log(respuesta.data);      

        setNews([]);
        setAllResults(0);
      
      }
   
    };

  const setNewSize = (newSize) => {
    if (newSize.length === 0) return null;

    setCurrentPage(1);
    setSize(newSize);
  };

  const setNewCurrentPage = (newSize) => {
    setCurrentPage(parseInt(newSize));
  };

  const refreshNewsData = (tipo) => {
   
    setType(tipo);
  
  };

  const obtienePrimerId = async (tipo) => {
    let url = `/${tipo}?_sort=fh_public&_order=desc&_page=1&_limit=1`;
    const respuesta = await clienteAxios.get(url);

    return respuesta.data[0];
  };

  const obtieneEditarNoticia = async (tipo, id) => {
    try {
      let url = `/noticias/${id}`;

      const respuesta = await clienteAxios.get(url);

      return respuesta;
      // setEditarNoticia(respuesta.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyContext.Provider
      value={{
        news,
        setNews,
        allResults,
        //  loadingNews,
        refreshNewsData,
        size,
        setNewSize,
        type,
        setType,
        pages,
        currentPage,
        setNewCurrentPage,
        wwidth,
        wheight,
        editarNoticia,
        obtieneEditarNoticia,
        obtienePrimerId,
        obtieneNoticias,
        currentDate,
        setCurrentDate,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyProvider;
