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
    let search_date = currentDate;

    try {
      const respuesta = await clienteAxios.get(
        `/${tipo}?_sort=fh_public&_order=desc&_page=${currentPage}&q=${search_date}`
      );
      const respuesta2 = await clienteAxios.get(`/${tipo}`);

      let newslist = [];

      respuesta.data.map((v, k) => {
        if ('fields' in v) {
          newslist.push(v);
        } else {
          let elem = {};
          elem.fields = v;
          elem.id = v.id_act_not;
          newslist.push(elem);
        }
      });

      setNews(newslist.reverse());

      let total = respuesta2.data.length;
      let total_pages = parseInt(total / size);

      setAllResults(total);

      if (total - total_pages * size > 0) total_pages += 1;

      setPages(total_pages);
      //  setLoadingNews(false);
    } catch (error) {
      setNews([]);
      setAllResults(1);
      //  setLoadingNews(false);
      console.error(error);
      alert(error);
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
    // if (!loadingNews) setLoadingNews(true);
    setType(tipo);
    obtieneNoticias(tipo);
  };

  const obtienePrimerId = async (tipo) => {
    let url = `/${tipo}?_sort=fh_public&_order=desc&_page=1&_limit=1`;
    const respuesta = await clienteAxios.get(url);

    return respuesta.data[0];
  };

  const obtieneEditarNoticia = async (tipo, id) => {
    try {
      let url = `/${tipo}?id=${id}`;

      const respuesta = await clienteAxios.get(url);

      setEditarNoticia(respuesta.data[0]);
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
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyProvider;
