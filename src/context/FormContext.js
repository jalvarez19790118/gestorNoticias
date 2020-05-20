import React, {createContext, useState, useEffect} from 'react';
import clienteAxios from '../config/axios';

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

    const obtieneEspecialidades = async() => {

        try {

            const respuesta = await clienteAxios.get(`/especialidades`);
            setEspecialidades(respuesta.data);

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
            setMedicamentos(respuesta.data);

        } catch (error) {

            console.log(error);
        }
    }

    const obtieneAtcs = async(input) => {

        try {

            const respuesta = await clienteAxios.get(`/atcs?nombre_like=${input}`);
            setAtcs(respuesta.data);

        } catch (error) {

            console.log(error);
        }
    }


    const obtieneEnfermedades = async(input) => {

        try {

            const respuesta = await clienteAxios.get(`/enfermedades?name_like=${input}`);
            setEnfermedades(respuesta.data);

        } catch (error) {

            console.log(error);
        }
    }

    useEffect(() => {
        obtieneEspecialidades();
        obtieneCategorias();
    }, [])

    return (

        <FormContext.Provider
            value={{
            especialidades,
            categorias,
            medicamentos,
            obtieneMedicamentos,
            atcs,
            obtieneAtcs,
            enfermedades,
            obtieneEnfermedades

        }}>
            {props.children}
        </FormContext.Provider>
    )

}

export default FormProvider;