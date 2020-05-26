const empty_new = {

    "fields": {
        "id_categoria": null,
        "titular": '',
        "entradilla": null,
        "tipo_referencia": 'ENT',
        "nom_labo_entidad": '',
        "year": new Date(),
        "fh_public": new Date(),
        "fh_desactivacion": new Date(),
        "fh_portada": new Date(),
        "ib_visible": 1,
        "ib_boletin": null,
        "img_noticia": null,
        "contenido_html": null,
        "creation": null,
        "modification": null,
        "ib_destacado": 0,
        "profesionales": 0,
        "palabra_clave": '',
        "id_imagen": null

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

const get_initial_new = () => {

    return empty_new;

}

export const init_noticia = get_initial_new();