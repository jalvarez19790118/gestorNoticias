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
  const [endResult, setEndResult] = useState(20);
  const [currentDate, setCurrentDate] = useState(null);
  const [wwidth, setWwidth] = useState(window.innerWidth);
  const [wheight, setWheight] = useState(window.innerHeight);
  const [editarNoticia, setEditarNoticia] = useState(null);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const updateOnpanelSize = () => {
    setWwidth(window.innerWidth);
    setWheight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateOnpanelSize);
    return () => window.removeEventListener('resize', updateOnpanelSize);
  });

  const obtieneNoticias = async (tipo, date_out, date_in, page = 1, perPage = 50) => {
    const d1 = new Date(date_out);
    const d2 = new Date(date_in);

    const dtf = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const [{ value: mo1 }, , { value: da1 }, , { value: ye1 }] = dtf.formatToParts(d1);
    const format_data1 = `${da1}-${mo1}-${ye1}`;

    const [{ value: mo2 }, , { value: da2 }, , { value: ye2 }] = dtf.formatToParts(d2);
    const format_data2 = `${da2}-${mo2}-${ye2}`;

    const data = new Object();
    data.fini = format_data1;
    data.ffin = format_data2;
    data.page = page;
    data.per_page = perPage;

    if (tipo === 'noticias') data.tipos = 1;
    if (tipo === 'alertas') data.tipos = 2;
    if (tipo === 'pactivos') data.tipos = 3;

    const respuesta = await clienteAxios.post(`/noticias/byDate`, data);

    if (respuesta.data.success) {
      let newslist = respuesta.data.resultados;
      setNews(newslist);
      setAllResults(respuesta.data.total_resultados);

      if (respuesta.data.total_paginas === 0) {
        setCurrentPage(1);
        setEndResult(respuesta.data.total_resultados);
      } else {
        if (respuesta.data.pagina == 1) {
          setCurrentPage(respuesta.data.pagina);
          setEndResult(perPage);
        } else {
          setCurrentPage((respuesta.data.pagina - 1) * perPage + 1);

          if (respuesta.data.pagina < respuesta.data.total_paginas) {
            setEndResult((respuesta.data.pagina - 1) * perPage + 1 + perPage);
          } else {
            setEndResult(respuesta.data.total_resultados);
          }
        }
      }

      setTotalPaginas(respuesta.data.total_paginas);
    } else {
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
        totalPaginas,
        setTotalPaginas,
        endResult,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyProvider;
