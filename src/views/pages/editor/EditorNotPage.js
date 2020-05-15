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
        "id_categoria": null,
        "titular": '',
        "entradilla": null,
        "tipo_referencia": null,
        "nom_labo_entidad": null,
        "year": new Date(),
        "html": null,
        "pdf": null,
        "fh_public": new Date(),
        "fh_desactivacion": null,
        "fh_portada": null,
        "ib_visible": null,
        "ib_boletin": null,
        "img_noticia": null,
        "resumen": null,
        "contenido_html": null,
        "creation": null,
        "modification": null,
        "ib_destacado": null,
        "profesionales": null,
        "palabra_clave": null,
        "id_imagen": null

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