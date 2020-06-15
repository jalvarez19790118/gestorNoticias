import React, { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import axios from 'axios';

export const FormContext = createContext();

const FormProvider = (props) => {
  const [especialidades, setEspecialidades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [atcs, setAtcs] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [entidades, setEntidades] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [mandatoryFields, setMandatoryFields] = useState(['titular', 'entradilla', 'contenido_html']);
  const [vacios, setVacios] = useState(null);

  const [noticia, setNoticia] = useState(null);

  const init_noticia = {
    fields: {
      id_categoria: '',
      titular: '',
      entradilla: '',
      tipo_referencia: 'ENT',
      nom_labo_entidad: '',
      year: new Date(),
      fh_public: new Date(),
      fh_desactivacion: '',
      fh_portada: '',
      ib_visible: 1,
      ib_boletin: '',
      img_noticia: '',
      contenido_html: '',
      creation: '',
      modification: '',
      ib_destacado: 0,
      profesionales: 0,
      palabra_clave: '',
      id_imagen: '',
    },

    especialities: {
      active: 0,
      list: [],
    },

    drugs: {
      active: 0,
      list: [],
    },

    atcs: {
      active: 0,
      list: [],
    },

    diseases: {
      active: 0,
      list: [],
    },

    laboratories: {
      active: 0,
      list: [],
    },

    entities: {
      active: 0,
      list: [],
    },

    files: {
      list: [],
    },
  };

  const obtieneEspecialidades = async () => {
    try {
      const respuesta = await clienteAxios.get(`/especialidades`);

      let response = [];
      respuesta.data.map((v, k) => {
        let elem = {
          id: v.id,
          label: v.nombre,
        };

        response.push(elem);
      });
      setEspecialidades(response);
    } catch (error) {
      console.log(error);
    }
  };

  const obtieneCategorias = async () => {
    try {
      const respuesta = await clienteAxios.get(`/categorias`);
      setCategorias(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtieneMedicamentos = async (input) => {
    try {
      const respuesta = await clienteAxios.get(`/medicamentos?name_like=${input}`);

      let response = [];
      respuesta.data.map((v, k) => {
        let elem = {
          id: v.productId,
          label: v.name,
        };

        response.push(elem);
      });

      setMedicamentos(response);
    } catch (error) {
      console.log(error);
    }
  };

  const obtieneAtcs = async (input) => {
    try {
      const respuesta = await clienteAxios.get(`/atcs?nombre_like=${input}`);

      let response = [];
      respuesta.data.map((v, k) => {
        let elem = {
          id: v.codigo,
          label: v.nombre,
        };

        response.push(elem);
      });

      setAtcs(response);
    } catch (error) {
      console.log(error);
    }
  };

  const obtieneEnfermedades = async (input) => {
    try {
      const respuesta = await clienteAxios.get(`/enfermedades?name_like=${input}`);

      let response = [];
      respuesta.data.map((v, k) => {
        let elem = {
          id: v.id,
          label: v.name,
        };

        response.push(elem);
      });

      setEnfermedades(response);
    } catch (error) {
      console.log(error);
    }
  };

  const obtieneLaboratorios = async (input) => {
    try {
      const respuesta = await clienteAxios.get(`/laboratorios?name_like=${input}`);

      let response = [];
      respuesta.data.map((v, k) => {
        let elem = {
          id: v.id,
          label: v.name,
        };

        response.push(elem);
      });

      setLaboratorios(response);
    } catch (error) {
      console.log(error);
    }
  };

  const obtieneEntidades = async (input) => {
    try {
      // const respuesta = await clienteAxios.get(`/laboratorios?name_like=${input}`);
      setEntidades([]);
    } catch (error) {
      console.log(error);
    }
  };

  const obtieneImgs = async (input) => {
    if (input === '') return;

    const imagenesporpagina = 4;
    const key = '15886562-b623b020d6de986a0980ca1d6';
    const lang = 'es';
    const category = 'health';
    const orientation = 'horizontal';
    const type = 'photo';
    const url = `https://pixabay.com/api/?key=${key}&q=${input}&category=${category}&page=1&per_page=${imagenesporpagina}&orientation=${orientation}&image_type=${type}`;

    const respuesta = await axios.get(url);

    let data = [];
    respuesta.data.hits.map((v, k) => {
      let obj = {
        id: v.id,
        url: v.largeImageURL,
        tags: v.tags,
        thumb: v.previewURL,
      };
      data.push(obj);
    });

    setImgs(data);

    return data;
  };

 

  const stripHtml = (html) => {
    let tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    let text = tmp.textContent || tmp.innerText || '';

    return text;
  };

  const verifyFields = (data) => {
    const fields = Object.entries(data.fields);
    let empties = [];
    fields.map((v) => (mandatoryFields.includes(v[0]) && stripHtml(v[1]).length <= 0 ? empties.push(v[0]) : null));
    setVacios(empties);
  };

  const saveNew = async (type, data) => {
    let respuesta;
    try {
      respuesta = await clienteAxios.post(`/${type}`, data);
    } catch (error) {
      respuesta = error;
    }

    return respuesta;
  };

  const updateNew = async (type, data) => {
    let respuesta;

    try {
      respuesta = await clienteAxios.put(`/${type}/${data.id}`, data);
    } catch (error) {
      respuesta = error;
    }

    return respuesta;
  };

  const deleteNew = async (type, data) => {
    let respuesta;
    try {
      respuesta = await clienteAxios.delete(`/${type}/${data}`);
    } catch (error) {
      respuesta = error;
    }

    return respuesta;
  };

  return (
    <FormContext.Provider
      value={{
        especialidades,
        obtieneEspecialidades,
        categorias,
        obtieneCategorias,
        medicamentos,
        obtieneMedicamentos,
        atcs,
        obtieneAtcs,
        enfermedades,
        obtieneEnfermedades,
        laboratorios,
        obtieneLaboratorios,
        entidades,
        obtieneEntidades,
        imgs,
        obtieneImgs,
        verifyFields,
        mandatoryFields,
        setVacios,
        vacios,
        saveNew,
        deleteNew,
        updateNew,
        init_noticia,
        noticia,
        setNoticia,
        
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export default FormProvider;
