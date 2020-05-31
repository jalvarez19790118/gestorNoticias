import React from 'react';
import {Container, Col, Row} from 'reactstrap';
import {IconSave} from './config/select_config';
import clienteAxios from '../../../config/axios'
import {v4 as uuidv4} from 'uuid';
import {useHistory} from "react-router-dom";

const EditorHeader = ({mode, storage, type}) => {

    const history = useHistory();

    const saveElement = async() => {

        let objNoticia = sessionStorage.getItem(storage);

        if (objNoticia !== null) {
            objNoticia = JSON.parse(objNoticia);

            try {

                objNoticia.id = uuidv4();
                objNoticia.fields.id_act_not = objNoticia.fields.id;
                const respuesta = await clienteAxios.post(`/${type}s`, objNoticia);

            } catch (error) {
                console.log(error);
            } finally
            {
                sessionStorage.removeItem(storage);
                history.push(`/gestor/${type[0]}/${type}s`);
            }

        }

    }

    const updateElement = async() => {

        let objNoticia = sessionStorage.getItem(storage);

        if (objNoticia !== null) {
            objNoticia = JSON.parse(objNoticia);

            try {

                const respuesta = await clienteAxios.put(`/${type}s/${objNoticia.id}`, objNoticia);

            } catch (error) {
                console.log(error);
            } finally
            {
                sessionStorage.removeItem(storage);
                history.push(`/gestor/${type[0]}/${type}s`);

            }

        }

    }

    const buttonSave = <button onClick={e => saveElement()} className="float-right">{IconSave}Guardar {type}</button>
    const buttonUpdate = <button onClick={e => updateElement()} className="float-right">{IconSave}Modificar {type}</button>

    return (

        <Container className="EditorHeader p-0" fluid={true}>

            <Row className="m-0 p-0">

                <Col sm='12' className="m-0 p-0">
                    {mode == 'save'
                        ? buttonSave
                        : buttonUpdate}

                </Col>

            </Row>

        </Container>

    )
}

export default EditorHeader;