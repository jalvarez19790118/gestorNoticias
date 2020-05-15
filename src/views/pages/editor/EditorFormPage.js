import React from 'react';
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
import DatePicker, {registerLocale} from "react-datepicker";
import es from "date-fns/locale/es"; // the locale you want
import "react-datepicker/dist/react-datepicker.css";
import Toggle from 'react-toggle'
import "react-toggle/style.css";
import Select  from 'react-select';

registerLocale("es", es);

const EditorFormPage = ({noticia, setNoticia}) => {

    const setFormValue = (target, value) => {

        let new_noticia = {
            ...noticia
        };

        new_noticia[target] = value;
        setNoticia(new_noticia);

    }

    const modules_entradilla = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike']
        ]
    }

    const modules = {
        toolbar: [

            [
                {
                    'header': [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        false
                    ]
                }
            ],
            [
                'bold', 'italic', 'underline', 'strike'
            ],
            [
                {
                    'list': 'ordered'
                }, {
                    'list': 'bullet'
                }, {
                    'indent': '-1'
                }, {
                    'indent': '+1'
                }
            ],
            [
                'link', 'image'
            ],
            [
                {
                    'color': []
                }, {
                    'background': []
                }
            ],
            ['clean']
        ]
    }

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color'
    ]


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    return (

        <Container fuid="true" className="EditorFormPage m-0 p-0">

            <Row>
                <Col sm='12'>
                    <Form>
                        <Row className="m-0 p-0 px-1 pt-2 pb-1">

                            <Col xs="12" className="m-0 p-0  d-flex ">
                                <div className="text-left toggle-container">
                                    <Toggle
                                        id='show_not'
                                        defaultChecked={true}
                                        onChange={e => console.log(e.target)}/>
                                    <label>Mostrar</label>

                                    <Toggle
                                        id='show_not'
                                        defaultChecked={false}
                                        onChange={e => console.log(e.target)}/>
                                    <label>Destacado</label>

                                    <Toggle id='show_bot' defaultChecked={false} onChange={e => console.log(e)}/>
                                    <label>Profesionales</label>

                                    <Toggle
                                        id='show_bot'
                                        defaultChecked={false}
                                        onChange={e => console.log(e.target)}/>
                                    <label>Boletín</label>
                                </div>
                            </Col>

                        </Row>

                        <Row className="m-0 p-0 px-1 pt-1 pb-1">

                            <Col xs="4" className="m-0 p-0 pr-2 py-0 ">

                                <FormGroup>
                                    <div className="label">Publicacion:</div>
                                    <DatePicker
                                        selected={noticia.fh_public}
                                        value={noticia.fh_public}
                                        className="text-center"
                                        onChange={date => setFormValue('fh_public', date)}
                                        locale="es"
                                        dateFormat="dd-MM-yyyy"
                                        placeholderText=""/>

                                </FormGroup>
                            </Col>
                            <Col xs="4" className="m-0 p-0 pr-2 py-0 ">

                                <FormGroup>
                                    <div className="label">Desactivación:</div>
                                    <DatePicker
                                        selected={noticia.fh_desactivacion}
                                        className="text-center"
                                        value={noticia.fh_desactivacion}
                                        onChange={date => setFormValue('fh_desactivacion', date)}
                                        locale="es"
                                        dateFormat="dd-MM-yyyy"
                                        placeholderText=""/>

                                </FormGroup>
                            </Col>

                            <Col xs="4" className="m-0 p-0 pr-2 py-0 ">

                                <FormGroup>
                                    <div className="label">En Portada hasta:</div>
                                    <DatePicker
                                        selected={noticia.fh_desactivacion}
                                        className="text-center"
                                        value={noticia.fh_desactivacion}
                                        onChange={date => setFormValue('fh_desactivacion', date)}
                                        locale="es"
                                        dateFormat="dd-MM-yyyy"
                                        placeholderText=""/>

                                </FormGroup>
                            </Col>

                        </Row>
                        <Row className="m-0 p-0 px-1 pb-1 ">

                            <Col xs="3" className="m-0 p-0 pr-1 py-0">

                                <FormGroup>
                                    <Label>Tipo:</Label>
                                    <Input
                                        type="select"
                                        name="tipo_referencia"
                                        onChange={e => setFormValue(e.target.name, e.target.value)}>
                                        <option value="LAB">Laboratorio</option>
                                        <option value="ENT">Entidad</option>

                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col xs="9" className="m-0 px-1 py-0">

                                <FormGroup className="p-0">
                                    <Label for="exampleEmail">Entidad/Laboratorio:</Label>
                                    <Input
                                        onChange={e => setFormValue(e.target.name, e.target.value)}
                                        type="text"
                                        name="titular"
                                        id="titular"
                                        value={noticia.titular}
                                        placeholder=""/>
                                </FormGroup>

                            </Col>

                        </Row>

                        <Row className="m-0 p-0 px-1 pb-1 ">

                            <Col xs="3" className="m-0 p-0 pr-1 py-0">

                                <FormGroup>
                                    <Label>Categoria:</Label>
                                    <Input
                                        type="select"
                                        name="tipo_referencia"
                                        onChange={e => setFormValue(e.target.name, e.target.value)}></Input>
                                </FormGroup>
                            </Col>

                            <Col xs="9" className="m-0 px-1 py-0">

                                <FormGroup className="p-0">
                                    <Label for="exampleEmail">Palabra clave:</Label>
                                    <Input
                                        onChange={e => setFormValue(e.target.name, e.target.value)}
                                        type="text"
                                        name="titular"
                                        id="titular"
                                        value={noticia.titular}
                                        placeholder=""/>
                                </FormGroup>

                            </Col>

                        </Row>

                        <Row className="m-0 p-0 px-1 pt-2 pb-1">
                            <Col xs="12" className="m-0 p-0 ">

                                <div className="toggle-container">
                                    <Toggle id='show_bot' defaultChecked={false} onChange={e => console.log(e)}/>
                                    <label>Especialidas Médicas</label>

                                </div>
                                <div class="select-container">

                                <Select
                                    
                                    isMulti
                                    options={options}/>
                                </div>
                            </Col>
                        </Row>

                        <Row className="m-0 p-2">

                            <Col sm="12" className="m-0 p-0 py-0">
                                <FormGroup className="p-0">
                                    <Label for="exampleEmail">Titular:</Label>
                                    <Input
                                        onChange={e => setFormValue(e.target.name, e.target.value)}
                                        type="text"
                                        name="titular"
                                        id="titular"
                                        value={noticia.titular}
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
                                        value={noticia.entradilla}
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
                                        value={noticia.contenido_html}
                                        className="EditorContenido"
                                        onChange={e => setFormValue('contenido_html', e)}/>

                                </FormGroup>
                            </Col>

                        </Row>

                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default EditorFormPage;