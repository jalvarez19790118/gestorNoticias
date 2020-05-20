import React, {useContext, useState, useEffect, Fragment} from 'react';
import {FormContext} from '../../../context/FormContext';
import {
    Container,
    Col,

    Row,
   
    Input,
    Label
} from 'reactstrap';

import DatePicker, {registerLocale} from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import Toggle from 'react-toggle'
import "react-toggle/style.css";
import Select from 'react-select';
import EspecialitiesSelect from './selectComponents/EspecialitiesSelect';
import DrugsSelect from './selectComponents/DrugsSelect';
import ATCsSelect from './selectComponents/AtcsSelect';
import DisasesSelect from './selectComponents/DiseasesSelect';


registerLocale("es", es);

const EditorFieldsFormPage = ({noticia, setNoticia}) => {

    const [defaultCat,
        setdefaultCat] = useState([]);

    const {categorias} = useContext(FormContext);

    useEffect(() => {

        if (categorias.length > 0) {

            let options_cat = [];

            categorias.map((value, key) => {

                options_cat.push({
                    value: value.id,
                    label: value
                        .nombre
                        .toLowerCase()
                        .charAt(0)
                        .toUpperCase() + value
                        .nombre
                        .toLowerCase()
                        .slice(1)
                });

            })

            setdefaultCat(options_cat);
        }

    }, [categorias])

    const setFormValue = (field, value) => {

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

            <Container fuid="true" className="EditorFormPage m-0 p-0 mb-1">

                <Row className="m-0 p-1">
                    <Col sm="12" md="3" className="m-0 p-0 py-0 pr-1">

                        
                            <div className="label">Año:</div>
                            <DatePicker
                                selected={noticia.fields.year}
                                value={noticia.fields.year}
                                className="text-center"
                                onChange={date => setFormValue('year', date)}
                                locale="es"
                                showYearPicker
                                dateFormat="yyyy"
                                placeholderText=""/>

                    
                    </Col>

                    <Col sm="12" md="3" className="m-0 p-0 py-0 pr-1">
                       
                            <div className="label">Publicacion:</div>
                            <DatePicker
                                selected={noticia.fields.fh_public}
                                value={noticia.fields.fh_public}
                                className="text-center"
                                onChange={date => setFormValue('fh_public', date)}
                                locale="es"
                                dateFormat="dd-MM-yyyy"
                                placeholderText=""/>

                    </Col>
                    <Col sm="12" md="3" className="m-0 p-0 py-0 pr-1">
                      
                            <div className="label">Desactivación:</div>
                            <DatePicker
                                selected={noticia.fields.fh_desactivacion}
                                className="text-center"
                                value={noticia.fields.fh_desactivacion}
                                onChange={date => {
                                setFormValue('fh_desactivacion', date)
                            }}
                                locale="es"
                                dateFormat="dd-MM-yyyy"
                                placeholderText=""/>

                    </Col>

                    <Col sm="12" md="3" className="m-0 p-0 py-0 pr-0" >

                      
                            <div className="label">En Portada hasta:</div>
                            <DatePicker
                                selected={noticia.fields.fh_portada}
                                className="text-center"
                                value={noticia.fields.fh_portada}
                                onChange={date => setFormValue('fh_portada', date)}
                                locale="es"
                                dateFormat="dd-MM-yyyy"
                                placeholderText=""/>


                    </Col>

                </Row>

                <Row className="m-0 p-0 px-1 pb-1 ">

                    <Col xs="3" className="m-0 p-0 pr-1 py-0">

                        <div className="select-container">
                            <Label for="exampleEmail">Tipo:</Label>

                            <Select
                                onChange={e => setFormValue('tipo_referencia', e)}
                                defaultValue={noticia.fields.tipo_referencia}
                                options={[
                                {
                                    value: 'ENT',
                                    label: 'Entidad'
                                }, {
                                    value: 'LAB',
                                    label: 'Laboratorio'
                                }
                            ]}
                                placeholder={""}/>
                        </div>

                    </Col>

                    <Col xs="9" className="m-0 p-0 py-0">
                       
                            <Label for="exampleEmail">Entidad/Laboratorio:</Label>
                            <Input
                                onChange={e => setFormValue(e.target.name, e.target.value)}
                                type="text"
                                name="nom_labo_entidad"
                                id="nom_labo_entidad"
                                value={noticia.fields.nom_labo_entidad}
                                placeholder=""/>
                       

                    </Col>

                </Row>

                <Row className="m-0 p-1 ">

                    <Col xs="12" md="6" className="m-0 pr-1 p-0">

                        <div className="select-container">
                            <Label>Categoria:</Label>
                            <Select
                                onChange={e => setFormValue('id_categoria', e)}
                                defaultValue={noticia.fields.id_categoria}
                                options={defaultCat}
                                placeholder={""}/>
                        </div>
                    </Col>

                    <Col xs="12" md="6" className="m-0 p-0">

                     
                            <Label for="exampleEmail">Palabra clave:</Label>
                            <Input
                                onChange={e => setFormValue(e.target.name, e.target.value)}
                                type="text"
                                name="palabra_clave"
                                id="palabra_clave"
                                value={noticia.fields.palabra_clave}
                                placeholder=""/>
                      

                    </Col>

                </Row>

            </Container>

            <Container fuid="true" className="EditorFormPage m-0 p-0">
                <Row className="m-0 p-1 ">
                    <Col xs="6" className="m-0 p-0 ">

                        <div className="toggle-container">
                            <Toggle
                                id='ib_visible'
                                name='ib_visible'
                                defaultChecked={!!noticia.fields.ib_visible}
                                onChange={e => setFormValue('ib_visible', e.target.checked
                                ? 1
                                : 0)}/>
                            <label>Mostrar</label>

                        </div>

                    </Col>
                    <Col xs="6" className="m-0 p-0 ">

                        <div className="toggle-container">
                            <Toggle
                                id='ib_boletin'
                                name='ib_boletin'
                                defaultChecked={!!noticia.fields.ib_boletin}
                                onChange={e => setFormValue('ib_boletin', e.target.checked
                                ? 1
                                : 0)}/>
                            <label>Incluir en el boletín</label>

                        </div>

                    </Col>
                </Row>

                <Row className="m-0 p-0 px-1 py-1">
                    <Col xs="6" className="m-0 p-0 ">

                        <div className="toggle-container">
                            <Toggle
                                id='profesionales'
                                name='profesionales'
                                defaultChecked={noticia.fields.profesionales === 1
                                ? true
                                : false}
                                onChange={e => setFormValue('profesionales', e.target.checked
                                ? 1
                                : 0)}/>
                            <label>Profesionales</label>

                        </div>

                    </Col>
                    <Col xs="6" className="m-0 p-0 ">

                        <div className="toggle-container">
                            <Toggle
                                id='ib_destacado'
                                name='ib_destacado'
                                defaultChecked={!!noticia.fields.ib_destacado}
                                onChange={e => setFormValue('ib_destacado', e.target.checked
                                ? 1
                                : 0)}/>
                            <label>Destacado</label>

                        </div>

                    </Col>
                </Row>

            </Container>

            <EspecialitiesSelect noticia={noticia} setNoticia={setNoticia}/>
            <DrugsSelect noticia={noticia} setNoticia={setNoticia}/>
            <ATCsSelect noticia={noticia} setNoticia={setNoticia}/>
            <DisasesSelect noticia={noticia} setNoticia={setNoticia}/>

        </Fragment>
    )
}

export default EditorFieldsFormPage;