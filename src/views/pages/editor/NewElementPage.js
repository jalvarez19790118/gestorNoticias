import React, {useState, useEffect, Fragment} from 'react';
import LoadingCard from '../../commons/LoadingCard';
import {useLocation,useParams} from "react-router-dom";

import EditorContentPanel from './EditorContentPanel';
import EditorHeader from './EditorHeader';

const init_noticia = {
    "fields": {
        "id_categoria": "",
        "titular": '',
        "entradilla": "",
        "tipo_referencia": 'ENT',
        "nom_labo_entidad": '',
        "year": new Date(),
        "fh_public": new Date(),
        "fh_desactivacion": new Date(),
        "fh_portada": new Date(),
        "ib_visible": 1,
        "ib_boletin": "",
        "img_noticia": "",
        "contenido_html": "",
        "creation": "",
        "modification": "",
        "ib_destacado": 0,
        "profesionales": 0,
        "palabra_clave": '',
        "id_imagen": ""

    },

    "especialities": {
        "active": 0,
        "list": []
    },

    "drugs": {
        "active": 0,
        "list": []
    },

    "atcs": {
        "active": 0,
        "list": []
    },

    "diseases": {
        "active": 0,
        "list": []
    },

    "laboratories": {
        "active": 0,
        "list": []
    },

    "entities": {
        "active": 0,
        "list": []
    },

    "files": {
        "list": []
    }

}

const NewElementPage = () => {

    const location = useLocation();

    const {element} = useParams();
  

    const getSessionState = () => {

        let new_status = init_noticia
        
        

        let objNoticia = sessionStorage.getItem('nueva_' + element);

        if (objNoticia === null) {
       
            new_status = init_noticia

        } else 
            new_status = JSON.parse(objNoticia);
        
        return new_status;

    }

    const [noticia,
        setNoticia] = useState(null);

    useEffect(() => {

        if (noticia == null) {
            console.log(element);

            setNoticia(getSessionState);
            setFirst(false);
        }

    }, [location]);

    const [first,
        setFirst] = useState(true);

    return (

        <Fragment>
            {first
                ? <LoadingCard/>
                : <Fragment><EditorHeader/><EditorContentPanel
                    type={`nueva_${element}`}
                    noticia={noticia}
                    setNoticia={setNoticia}/></Fragment>}
        </Fragment>
    )

}

export default NewElementPage;