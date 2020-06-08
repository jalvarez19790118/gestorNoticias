import React, { useState, useEffect, Fragment, useContext } from 'react';
import LoadingCard from '../../commons/LoadingCard';
import { useLocation, useParams } from 'react-router-dom';
import { FormContext } from '../../../context/FormContext';
import EditorContentPanel from './EditorContentPanel';

const NewElementPage = () => {
  const location = useLocation();
  const { element } = useParams();
  const { noticia, setNoticia, init_noticia, setVacios } = useContext(FormContext);

  const getSessionState = () => {
    let new_status = init_noticia;

    let objNoticia = sessionStorage.getItem('nueva_' + element);

    if (objNoticia === null) {
      new_status = init_noticia;
      sessionStorage.setItem('nueva_' + element, JSON.stringify(new_status));
    } else {
      new_status = JSON.parse(objNoticia);
    }
    return new_status;
  };

  useEffect(() => {
    if (noticia == null) {
      setNoticia(getSessionState);
      setFirst(false);
    }
    setVacios([]);
  }, [location]);

  const [first, setFirst] = useState(true);

  return (
    <Fragment>
      {first ? (
        <LoadingCard />
      ) : (
        <Fragment>
          <EditorContentPanel type={`nueva_${element}`} noticia={noticia} setNoticia={setNoticia} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default NewElementPage;
