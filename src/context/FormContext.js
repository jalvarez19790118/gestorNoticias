import React, {createContext, useState, useEffect} from 'react';
import clienteAxios from '../config/axios';
import axios from 'axios';

export const FormContext = createContext();

const FormProvider = (props) => {

    const [especialidades,
        setEspecialidades] = useState([]);

    const [categorias,
        setCategorias] = useState([]);

    const [medicamentos,
        setMedicamentos] = useState([]);

    const [atcs,
        setAtcs] = useState([]);

    const [enfermedades,
        setEnfermedades] = useState([]);

    const [laboratorios,
        setLaboratorios] = useState([]);

    const [entidades,
        setEntidades] = useState([]);

    const [imgs,
        setImgs] = useState([]);

    const [mandatoryFields, setMandatoryFields] = useState(['titular','entradilla','contenido_html']);   

    const [emptyFields, setEmptyFields] = useState(null); 



    


    const obtieneEspecialidades = async() => {

        try {

            const respuesta = await clienteAxios.get(`/especialidades`);

            let response = [];
            respuesta
                .data
                .map((v, k) => {

                    let elem = {
                        'id': v.id,
                        'label': v.nombre
                    };

                    response.push(elem);
                })
            setEspecialidades(response);

        } catch (error) {

            console.log(error);
        }
    }

    const obtieneCategorias = async() => {

        try {

            const respuesta = await clienteAxios.get(`/categorias`);
            setCategorias(respuesta.data);

        } catch (error) {

            console.log(error);
        }
    }

    const obtieneMedicamentos = async(input) => {

        try {

            const respuesta = await clienteAxios.get(`/medicamentos?name_like=${input}`);

            let response = [];
            respuesta
                .data
                .map((v, k) => {

                    let elem = {
                        'id': v.productId,
                        'label': v.name
                    };

                    response.push(elem);
                })

            setMedicamentos(response);

        } catch (error) {

            console.log(error);
        }
    }

    const obtieneAtcs = async(input) => {

        try {

            const respuesta = await clienteAxios.get(`/atcs?nombre_like=${input}`);

            let response = [];
            respuesta
                .data
                .map((v, k) => {

                    let elem = {
                        'id': v.codigo,
                        'label': v.nombre
                    };

                    response.push(elem);
                })

            setAtcs(response);

        } catch (error) {

            console.log(error);
        }
    }

    const obtieneEnfermedades = async(input) => {

        try {

            const respuesta = await clienteAxios.get(`/enfermedades?name_like=${input}`);

            let response = [];
            respuesta
                .data
                .map((v, k) => {

                    let elem = {
                        'id': v.id,
                        'label': v.name
                    };

                    response.push(elem);
                })

            setEnfermedades(response);

        } catch (error) {

            console.log(error);
        }
    }

    const obtieneLaboratorios = async(input) => {

        try {

            const respuesta = await clienteAxios.get(`/laboratorios?name_like=${input}`);

            let response = [];
            respuesta
                .data
                .map((v, k) => {

                    let elem = {
                        'id': v.id,
                        'label': v.name
                    };

                    response.push(elem);
                })

            setLaboratorios(response);

        } catch (error) {

            console.log(error);
        }
    }

    const obtieneEntidades = async(input) => {

        try {

            // const respuesta = await clienteAxios.get(`/laboratorios?name_like=${input}`);
            setEntidades([]);

        } catch (error) {

            console.log(error);
        }
    }

    const obtieneImgs = async(input) => {

        if (input === '') 
            return;
        
        const imagenesporpagina = 4;
        const key = '15886562-b623b020d6de986a0980ca1d6';
        const lang = 'es';
        const category = 'health';
        const orientation = 'horizontal';
        const type = 'photo';
        const url = `https://pixabay.com/api/?key=${key}&q=${input}&category=${category}&page=1&per_page=${imagenesporpagina}&orientation=${orientation}&image_type=${type}`;

        const respuesta = await axios.get(url);

        let data = [];
        respuesta
            .data
            .hits
            .map((v, k) => {

                let obj = {
                    'id': v.id,
                    'url': v.largeImageURL,
                    'tags': v.tags,
                    'thumb': v.previewURL
                }
                data.push(obj);

            });

        setImgs(data)

        return data;

    }

    useEffect(() => {

      if (categorias.length === 0)  obtieneCategorias();
    }, [])

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
            emptyFields,
            mandatoryFields,
            setEmptyFields
            
        }}>
            {props.children}
        </FormContext.Provider>
    )

}

export default FormProvider;