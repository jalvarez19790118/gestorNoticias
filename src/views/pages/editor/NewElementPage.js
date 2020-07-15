import React, { useEffect, Fragment, useContext } from 'react';
import LoadingCard from '../../commons/LoadingCard';
import { useLocation, useParams } from 'react-router-dom';
import { FormContext } from '../../../context/FormContext';
import EditorContentPanel from './EditorContentPanel';

const NewElementPage = () => {
  const location = useLocation();
  const { element } = useParams();
  const {
    obtieneCategorias,
    setNoticia,
    setVacios,
    obtienePalabras,
    obtieneBanco,
    obtieneRelacionImagen,
    setChangefields,
    first,
    init_noticia,
    setAttached,
  } = useContext(FormContext);

  useEffect(() => {
    setNoticia(init_noticia);

    obtieneCategorias();
    obtienePalabras();
    obtieneBanco();
    obtieneRelacionImagen();
    setChangefields({});
    setVacios([]);
    setAttached([]);
    setVacios([]);
  }, [location]);

  return (
    <Fragment>
      {first ? (
        <LoadingCard />
      ) : (
        <Fragment>
          <EditorContentPanel type={`nueva_${element}`} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default NewElementPage;
