import React, {useContext, useState, useEffect, Fragment} from 'react';
import SunEditor, {buttonList} from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import {btnList} from './config/editor_config';
import {
    Container,
    Col,
    Row,
    Form,
    FormGroup,
    Input,
    Label,
    CardBody
} from 'reactstrap';

import {MyContext} from '../../../context/MyContext';


import $ from 'jquery';

const EditorSunFormPage = ({type,noticia, setNoticia}) => {



    const {wwidth, wheight} = useContext(MyContext);

    useEffect(() => {

        let entrallidaheight = $('.EditorEntradilla .sun-editor').height();
        

        let new_height = `${wheight - (entrallidaheight + 350)}px`;

        $('.EditorContenido .se-wrapper-wysiwyg').css({'min-height': new_height});

    });




    const saveState = (new_noticia) => {

        sessionStorage.setItem(type, JSON.stringify(new_noticia));
        setNoticia(new_noticia);
    }    




    const setFormValue = (field, value) => {

        let fields = {
            ...noticia.fields,
            [field]: value
        };
        
        let new_noticia ={
            ...noticia,
            fields
        }

    
        saveState(new_noticia);
    }

    return (

        <Fragment>
            <Container fuid="true" className="EditorFormPage m-0 p-0">

                <Form>

                    <Row className="m-0 px-1 pb-1 pt-0">

                        <Col sm="12" className="m-0 p-0 py-0">
                            <FormGroup className="p-0">
                                <Label for="exampleEmail">Titular:</Label>
                                <Input
                                    onChange={e => setFormValue(e.target.name, e.target.value)}
                                    type="text"
                                    name="titular"
                                    id="titular"
                                    value={noticia.fields.titular}
                                    placeholder=""/>
                            </FormGroup>
                        </Col>

                    </Row>

                    <Row className="m-0 px-1 pb-1 pt-0">
                        <Col xs="12" className="m-0  p-0">
                            <FormGroup className="p-0 EditorEntradilla">
                                <Label for="exampleEmail">Entradilla:</Label>

                                <SunEditor
                                    lang="es"

                                    setContents={noticia.fields.entradilla}
                                   
                                    onChange = {e => setFormValue('entradilla', e)}
                                    setOptions={{
                                  
                                    buttonList: btnList }}/>

                            </FormGroup>
                        </Col>

                    </Row>

                    <Row className="m-0 px-1 pb-1 pt-0">
                        <Col xs="12" className="m-0  p-0">
                            <FormGroup className="p-0 EditorContenido">
                                <Label for="exampleEmail">Contenido:</Label>
                                <SunEditor
                                setContents={noticia.fields.contenido_html}
                                onChange = {e => setFormValue('contenido_html', e)}
                                    lang="es"
                                    
                                    setOptions={{
                                  
                                    buttonList: btnList }}/>
                            </FormGroup>
                        </Col>

                    </Row>

                </Form>

            </Container>

        </Fragment>

    )
}

export default EditorSunFormPage;