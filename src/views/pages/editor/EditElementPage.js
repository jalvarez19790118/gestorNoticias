import React, {  useContext, useEffect, useState, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import LoadingCard from '../../commons/LoadingCard';
import EditorContentPanel from './EditorContentPanel';

import { MyContext } from '../../../context/MyContext';
import { FormContext } from '../../../context/FormContext';


const EditElementPage = () => {

  

  const { element, id } = useParams();
  const { obtieneEditarNoticia } = useContext(MyContext);
  const { setNoticia,  setVacios } = useContext(FormContext);
  const location = useLocation();
  

  const [notFound, setNotFound] = useState(false);
  const [first, setFirst] = useState(true);



  useEffect(() => {
  
    if (first)
    {
     //consoel obtieneEditarNoticia(`${element}s`, id);
     // setFirst(false);
 
            const respuesta = obtieneEditarNoticia(`${element}s`, id);
            respuesta.then(res=>{

              if (res.data[0] !== undefined)
              {
              
              
                sessionStorage.setItem(`editar_${element}_${id}`, JSON.stringify(res.data[0]));
                setNoticia(res.data[0]);
                setVacios([]);
              
              }
              else
              {
                setNotFound(true);
              }
              
              setFirst(false);

            });

    }
  
  }, [location]);

 
 

  const component = !notFound ? (
    <Fragment>
     <EditorContentPanel type={`editar_${element}_${id}`}  />
    </Fragment>
  ) : (
    <div className="mx-auto text-sm-center mt-5 font-weight-bold text-danger">
    <div className="my-auto">Elemento no encontrado!</div>
  </div>
  );

  return <Fragment>{first ? <LoadingCard /> : component}</Fragment>;
};

export default EditElementPage;
