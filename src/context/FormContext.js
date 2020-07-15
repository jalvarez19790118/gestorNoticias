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
  const [palabras, setPalabras] = useState([]);
  const [banco, setBanco] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [mandatoryFields, setMandatoryFields] = useState(['titular', 'entradilla', 'contenido_html']);
  const [vacios, setVacios] = useState(null);
  const [relacionImagen, setRelacionImagen] = useState(null);
  const [first, setFirst] = useState(true);

  const [changeFields, setChangefields] = useState([]);

  const [noticia, setNoticia] = useState(null);
  const [attached, setAttached] = useState([]);

  const init_noticia = {
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

    atc: [],
    enfermedad: [],
    entidad: [],
    laboratorio: [],
    medicamentos: [],
    vinculos: [],
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
      const respuesta = await clienteAxios.get(`/master/categoria`);
      setCategorias(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtienePalabras = async () => {
    try {
      const respuesta = await clienteAxios.get(`/master/banco_imagen_palabra`);
      setPalabras(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtieneBanco = async () => {
    try {
      const respuesta = await clienteAxios.get(`/master/banco_imagen`);

      let response = [];
      respuesta.data.map((v, k) => {
        response[v.id] = v.name;
      });

      setBanco(response);
    } catch (error) {
      console.log(error);
    }
  };

  const obtieneRelacionImagen = async () => {
    try {
      let data_res = [];

      const rq1 = clienteAxios.get('/master/banco_imagen_palabra');
      const rq2 = clienteAxios.get('/master/banco_imagen_categoria');
      const rq3 = clienteAxios.get('/master/banco_imagen_indicacion');

      await axios
        .all([rq1, rq2, rq3])
        .then(
          axios.spread((...responses) => {
            data_res['img_palabra'] = [];
            data_res['img_categoria'] = [];
            data_res['img_indicacion'] = [];

            responses[0].data.map((v) => (data_res['img_palabra'][v.id] = v.id_imagen));
            responses[1].data.map((v) => (data_res['img_categoria'][v.id] = v.id_imagen));
            responses[2].data.map((v) => (data_res['img_indicacion'][v.id] = v.id_imagen));

            setRelacionImagen(data_res);
            setFirst(false);
          })
        )
        .catch((errors) => {});
    } catch {}
  };

  const obtieneMedicamentos = async (input) => {
    try {
      const respuesta = await clienteAxios.get(`/search/master?t=medicamentos&q=${input}`);

      let response = [];
      respuesta.data.map((v, k) => {
        let elem = {
          id: v.id,
          label: v.nombre,
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
      const respuesta = await clienteAxios.get(`/search/master?t=atcs&q=${input}`);

      let response = [];
      respuesta.data.map((v, k) => {
        let elem = {
          id: v.id,
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
      const respuesta = await clienteAxios.get(`/search/master?t=indicacion&q=${input}`);

      let response = [];
      respuesta.data.map((v, k) => {
        let elem = {
          id: v.id,
          label: v.nombre,
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
      const respuesta = await clienteAxios.get(`/search/master?t=laboratorios&q=${input}`);

      let response = [];
      respuesta.data.map((v, k) => {
        let elem = {
          id: v.id,
          label: v.nombre,
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
      const respuesta = await clienteAxios.get(`/search/master?t=entidad&q=${input}`);

      let response = [];
      respuesta.data.map((v, k) => {
        let elem = {
          id: v.id,
          label: v.nombre,
        };

        response.push(elem);
      });

      setEntidades(response);
    } catch (error) {
      console.log(error);
    }
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
      respuesta = await clienteAxios.post(`/noticias`, data);
    } catch (error) {
      respuesta = error;
    }

    return respuesta;
  };

  const updateNew = async (type, data, id) => {
    let respuesta;

    try {
      if (data.medicamentos !== undefined)
        data.medicamentos.map((v) => {
          if (v['id_esp'] === undefined) v['id_esp'] = v.id;
          v['id'] = id;
        });
      if (data.atc !== undefined)
        data.atc.map((v) => {
          if (v['atc_code'] === undefined) v['atc_code'] = v.id;
          v['id'] = id;
        });
      if (data.enfermedad !== undefined)
        data.enfermedad.map((v) => {
          if (v['indicacion'] === undefined) v['indicacion'] = v.id;
          v['id'] = id;
        });
      if (data.laboratorio !== undefined)
        data.laboratorio.map((v) => {
          if (v['id_labo'] === undefined) v['id_labo'] = v.id;
          v['id'] = id;
        });
      if (data.entidad !== undefined)
        data.entidad.map((v) => {
          if (v['entidad'] === undefined) v['entidad'] = v.id;
          v['id'] = id;
        });

      respuesta = await clienteAxios.put(`/noticias/${id}`, data);
    } catch (error) {
      respuesta = error;
    }

    return respuesta;
  };

  const deleteNew = async (type, data) => {
    let respuesta;
    try {
      respuesta = await clienteAxios.delete(`/noticias/${data}`);
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
        //obtieneImgs,
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
        palabras,
        obtienePalabras,
        banco,
        obtieneBanco,
        relacionImagen,
        setRelacionImagen,
        obtieneRelacionImagen,
        changeFields,
        setChangefields,
        first,
        setFirst,
        attached,
        setAttached,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export default FormProvider;
