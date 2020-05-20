import React, {useState, useEffect, Fragment} from 'react';
import LoadingCard from '../../commons/LoadingCard';
import EditorContentPanel from './EditorContentPanel';


const EditorNotPage = () => {

    const [first,
        setFirst] = useState(true);

    useEffect(() => {

        setTimeout(()=>{setFirst(false)}, 300)

    }, []);

    
    const [noticia,
        setNoticia] = useState({

    "fields" : {
        "id_categoria": null,
        "titular": '',
        "entradilla": null,
        "tipo_referencia": 'ENT',
        "nom_labo_entidad": '',
        "year": new Date(),
        "html": null,
        "pdf": null,
        "fh_public": new Date(),
        "fh_desactivacion": null,
        "fh_portada": null,
        "ib_visible":   1,
        "ib_boletin": null,
        "img_noticia": null,
        "resumen": null,
        "contenido_html": null,
        "creation": null,
        "modification": null,
        "ib_destacado": 0,
        "profesionales": 0,
        "palabra_clave": '',
        "id_imagen": null

       },

      "especialities" : {
          "active" : 0,
          "list" : []
      } ,

      "drugs" : {
        "active" : 0,
        "list" : []
    } ,

    "atcs" : {
        "active" : 0,
        "list" : []
    },

    "diseases" : {
        "active" : 0,
        "list" : []
    } 


    });

    return (

        <Fragment>
            {first
                ? <LoadingCard/>
                : <EditorContentPanel noticia={noticia} setNoticia={setNoticia}/>}
        </Fragment>
    )

}

export default EditorNotPage;