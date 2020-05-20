import React, {useContext, useState, useEffect, Fragment} from 'react';
import {FormContext} from '../../../context/FormContext';
import {
    Container,
    Col,
    Row,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {modules, formats, modules_entradilla} from './config/quill_config';



const EditorFormPage = ({noticia, setNoticia}) => {

    const [defaultEspec,
        setdefaultEspec] = useState([]);

    const {especialidades} = useContext(FormContext);

    useEffect(() => {

        if (especialidades.length > 0) {

            let options = [];

            especialidades.map((value, key) => {

                options.push({value: value.id, label: value.nombre});

            })

            setdefaultEspec(options);
        }

    }, [especialidades])

    const setFormValue = (field, value, is_date = false) => {

        let fields = {
            ...noticia.fields,
            [field]: value
        };

        setNoticia({
            ...noticia,
            fields
        })

    }

    return (

        <Fragment>
        <Container fuid="true" className="EditorFormPage m-0 p-0">

            <Form>

                <Row className="m-0 p-2">

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

                <Row className="m-0 p-0 px-2 pb-1 ">
                    <Col xs="12" className="m-0  p-0">
                        <FormGroup className="p-0">
                            <Label for="exampleEmail">Entradilla:</Label>

                            <ReactQuill
                                modules={modules_entradilla}
                                theme="snow"
                                name="entradilla"
                                value={noticia.fields.entradilla}
                                className="EditorEntradilla"
                                onChange={e => setFormValue('entradilla', e)}/>

                        </FormGroup>
                    </Col>

                </Row>

                <Row className="m-0 p-0 px-2 pb-1 ">
                    <Col xs="12" className="m-0  p-0">
                        <FormGroup className="p-0">
                            <Label for="exampleEmail">Contenido:</Label>

                            <ReactQuill
                                modules={modules}
                                formats={formats}
                                theme="snow"
                                name="contenido_html"
                                value={noticia.fields.contenido_html}
                                className="EditorContenido"
                                onChange={e => setFormValue('contenido_html', e)}/>

                        </FormGroup>
                    </Col>

                </Row>

            </Form>

        </Container>
       

        </Fragment>

    )
}

export default EditorFormPage;