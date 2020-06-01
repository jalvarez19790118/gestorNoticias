import React, {Fragment, useState, useContext} from 'react';
import {Container, Col, Row} from 'reactstrap';
import {IconSave} from './config/select_config';
import clienteAxios from '../../../config/axios'
import {v4 as uuidv4} from 'uuid';
import {useHistory} from "react-router-dom";
import SavingCard from '../../commons/SavingCard';
import {FormContext} from '../../../context/FormContext';

const EditorHeader = ({mode, storage, type}) => {

    const history = useHistory();

    const [show,
        setShow] = useState(false);
    const [status,
        setStatus] = useState({'status': '', 'msg': ''});

    const {mandatoryFields, setEmptyFields} = useContext(FormContext);

    const stripHtml = (html) => {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        let text = tmp.textContent || tmp.innerText || "";

        return text;
    }

    const VerifyFields = (obj) => {

        let empties = [];
        Object
            .entries(obj)
            .map(v => (mandatoryFields.includes(v[0]) && stripHtml(v[1]).length <= 0)
                ? empties.push(v[0])
                : null);

      
        setEmptyFields(empties);

        return (empties <= 0)

    }

    const saveElement = async() => {

        let objNoticia = sessionStorage.getItem(storage);

        if (objNoticia !== null) {
            objNoticia = JSON.parse(objNoticia);

            if (!VerifyFields(objNoticia.fields)) {
                setStatus({'status': 'fail', 'msg': 'Existen campos obligatorios'})
                setShow(true);
                setTimeout(() => setShow(false), 1000)
                return null;
            }

            try {

                setStatus({'status': 'start', 'msg': 'guardando noticia...'});
                setShow(true);
                objNoticia.id = uuidv4();
                objNoticia.fields.id_act_not = objNoticia.fields.id;
                const respuesta = await clienteAxios.post(`/${type}s`, objNoticia);
                setStatus({'status': 'ok', 'msg': 'La noticia se ha guardado correctamente'});

            } catch (error) {
                setStatus({'status': 'fail', 'msg': `Se ha producido un error al guardar la noticia: ${error} `});
                console.log(error);
            } finally
            {
                sessionStorage.removeItem(storage);

                setTimeout(() => {
                    setShow(false)
                    history.push(`/gestor/${type[0]}/${type}s`);
                }, 1000)
            }

        }

    }

    const updateElement = async() => {

        let objNoticia = sessionStorage.getItem(storage);

        if (objNoticia !== null) {
            objNoticia = JSON.parse(objNoticia);

            if (!VerifyFields(objNoticia.fields)) {
                setStatus({'status': 'fail', 'msg': 'Existen campos obligatorios'})
                setShow(true);
                setTimeout(() => setShow(false), 1000)
                return null;
            }

            try {

                setStatus({'status': 'start', 'msg': 'actulizando noticia...'});
                setShow(true);
                const respuesta = await clienteAxios.put(`/${type}s/${objNoticia.id}`, objNoticia);

            } catch (error) {
                setStatus({'status': 'fail', 'msg': `Se ha producido un error al actualizar la noticia: ${error} `});

                console.log(error);
            } finally
            {
                sessionStorage.removeItem(storage);
                setTimeout(() => {
                    setShow(false)
                    history.push(`/gestor/${type[0]}/${type}s`);
                }, 1000)
            }

        }

    }

    const buttonSave = <button onClick={e => saveElement()} className="float-right">{IconSave}Guardar {type}</button>
    const buttonUpdate = <button onClick={e => updateElement()} className="float-right">{IconSave}Modificar {type}</button>

    return (
        <Fragment>
            <Container className="EditorHeader p-0" fluid={true}>

                <Row className="m-0 p-0">

                    <Col sm='12' className="m-0 p-0">
                        {mode == 'save'
                            ? buttonSave
                            : buttonUpdate}

                    </Col>

                </Row>

            </Container>
            <SavingCard show={show} status={status}></SavingCard>
        </Fragment>
    )
}

export default EditorHeader;