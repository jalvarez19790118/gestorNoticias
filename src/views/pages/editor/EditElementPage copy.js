import React, { useState, useContext, useEffect, Fragment } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import LoadingCard from '../../commons/LoadingCard';
import EditorContentPanel from './EditorContentPanel';
import EditorHeader from './EditorHeader';
import { MyContext } from '../../../context/MyContext';

import { FormContext } from '../../../context/FormContext';


const EditElementPage = () => {

  const [existStorage, setExistStorage] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { noticia, setNoticia, init_noticia, setVacios } = useContext(FormContext);


  const [first, setFirst] = useState(true);

  const { element, id } = useParams();

  const { editarNoticia, obtieneEditarNoticia, obtienePrimerId } = useContext(MyContext);

  const location = useLocation();
  const history = useHistory();

  const getSessionState = () => {
    let new_status = init_noticia;

    let objNoticia = sessionStorage.getItem(`editar_${element}_${id}`);

    if (objNoticia !== null) {
      objNoticia = JSON.parse(objNoticia);
      setExistStorage(true);
      return objNoticia;
    }

    return new_status;
  };


  const setUpEditarNoticia = () => {
    if (editarNoticia !== undefined) {
      sessionStorage.setItem(`editar_${element}_${id}`, JSON.stringify(editarNoticia));

      setNoticia(getSessionState());
    } else setNotFound(true);
  };

  useEffect(() => {
    if (id === '0') {
      obtienePrimerId(`${element}s`).then((data) => {
        history.push(`/gestor/editor/editar_${element}/${element}/${data.id}`);
      });
    }

    if (!existStorage) {
      obtieneEditarNoticia(`${element}s`, id);
      setTimeout(() => setFirst(false), 100);
    }
   
  }, [location]);

  useEffect(() => {
    if (editarNoticia !== null) setUpEditarNoticia();
    setTimeout(() => setFirst(false), 100);
  }, [editarNoticia]);

  const component = !notFound ? (
    <Fragment>
      <EditorHeader mode={'update'} storage={`editar_${element}_${id}`} type={element} />
      <EditorContentPanel type={`editar_${element}_${id}`} noticia={noticia} setNoticia={setNoticia} />
    </Fragment>
  ) : (
    <div>Elemento no encontrado!</div>
  );

  return <Fragment>{first ? <LoadingCard /> : component}</Fragment>;
};

export default EditElementPage;
