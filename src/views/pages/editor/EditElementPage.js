import React, {  useContext, useEffect, useState, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import LoadingCard from '../../commons/LoadingCard';
import EditorContentPanel from './EditorContentPanel';
import { MyContext } from '../../../context/MyContext';
import { FormContext } from '../../../context/FormContext';



const EditElementPage = () => {

  

  const { element, id } = useParams();
  const { obtieneEditarNoticia } = useContext(MyContext);
  
  const location = useLocation();
  

  const {
   
    obtieneCategorias,  
    setNoticia,
    setVacios,
    obtienePalabras,
    obtieneBanco,
    obtieneRelacionImagen,
    setChangefields,
    first,
    setFirst
  } = useContext(FormContext);


  const [notFound, setNotFound] = useState(false);
 



  useEffect(() => {


   

   
            const respuesta = obtieneEditarNoticia(`${element}s`, id);
            respuesta.then(res=>{


            
              if (res.data !== undefined )
              {
              
               

               
                if (res.data.error !== undefined) {
                  setNotFound(true);
                  setFirst(false);
                  return;
                }
             
             //   sessionStorage.setItem(`editar_${element}_${id}`, JSON.stringify(res.data));
                setNoticia(res.data);
                obtieneCategorias();
                obtienePalabras();
                obtieneBanco();
                obtieneRelacionImagen();
                setChangefields({})
                setVacios([]);
             
              
              }
              else
              {
                setNotFound(true);
              }
              
           

            });
 


  }, [location]);

 


  const component = !notFound ? (
    <Fragment>
     <EditorContentPanel  type={`editar_${element}_${id}`}  />
    </Fragment>
  ) : (
    <div className="mx-auto text-sm-center mt-5 font-weight-bold text-danger">
    <div className="my-auto">Elemento no encontrado!</div>
  </div>
  );

  return <Fragment>{first ? <LoadingCard /> : component}</Fragment>;
};

export default EditElementPage;
