import React, { useState, useEffect, Fragment, useContext } from 'react';
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
    setFirst,
    init_noticia
  } = useContext(FormContext);

  const getSessionState = () => {
    /*let new_status = init_noticia;

    let objNoticia = sessionStorage.getItem('nueva_' + element);

    if (objNoticia === null) {
    
      new_status = init_noticia;
     
     
    } else {
     
      new_status = JSON.parse(objNoticia);
    }

    sessionStorage.setItem('nueva_' + element, JSON.stringify(new_status));
    */
    //return new_status;
  };

  useEffect(() => {
    
   
     setNoticia(init_noticia);

     obtieneCategorias();
     obtienePalabras();
     obtieneBanco();
     obtieneRelacionImagen();
     setChangefields({})
     setVacios([]);
   
    
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
