import React, {useState, useEffect, Fragment} from 'react';
import LoadingCard from '../../commons/LoadingCard';
import EditorContentPanel from './EditorContentPanel';
import EditorHeader from './EditorHeader';

import EditorFooter from './EditorFooter';
import {init_noticia} from './config/noticia_config';
const NewNotPage = () => {

    


    const getSessionState  = () => {

        let new_status = {...init_noticia};


        let objNoticia = sessionStorage.getItem('nueva_noticia');
     
        if (objNoticia !== null) {
            objNoticia = JSON.parse(objNoticia); 
         
      
        
            return objNoticia;
        
           }

        
        return new_status;

    }
    
    const [noticia,
        setNoticia] = useState(getSessionState);

        
    const [first,
        setFirst] = useState(true);

    useEffect(() => {




        setTimeout(() => {
            setFirst(false)
        }, 300)

 
    
  
  
  }, []);

 
    

    return (

        <Fragment>
            {first
                ? <LoadingCard/>
                : <Fragment><EditorHeader/><EditorContentPanel type={'nueva_noticia'}  noticia={noticia} setNoticia={setNoticia}/></Fragment>}
        </Fragment>
    )

}

export default NewNotPage;