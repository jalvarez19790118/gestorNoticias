import React, {useContext, useState, useEffect, Fragment} from 'react';
import {FormContext} from '../../../context/FormContext';
import {Container, Col, Row, Input, Label} from 'reactstrap';

import DatePicker, {registerLocale} from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import Toggle from 'react-toggle'
import "react-toggle/style.css";
import Select from 'react-select';

import AttachFiles from './attachComponents/AttachFiles';
import ImgBank from './imgComponents/ImgBank';
import SelectComponents from './selectComponents/SelectComponent';

registerLocale("es", es);

const EditorFieldsFormPage = ({type, noticia, setNoticia}) => {

    const [defaultCat,
        setdefaultCat] = useState([]);

    const [selecCat,
        setSelectCat] = useState(null);

    const [keywords,
        setKeywords] = useState({});

    const [year,
        setYear] = useState(null);

    const [fhpublic,
        setFhPublic] = useState(null);

    const [fhdesact,
        setFhDesact] = useState(null);

    const [fhportada,
        setFhportada] = useState(null);

    const [tref,
        setTref] = useState(null);

    const {categorias} = useContext(FormContext);

    const saveState = (new_noticia) => {

        sessionStorage.setItem(type, JSON.stringify(new_noticia));
        setNoticia(new_noticia);
    }

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

            if (parseInt(noticia.fields.id_categoria) > 0) {
                let option = options_cat.filter((v, k) => v.value === noticia.fields.id_categoria);
                setSelectCat(option[0]);
            } else 

                setSelectCat(noticia.fields.id_categoria);

            }
    
        if (noticia.fields.year === null ||  noticia.fields.year === '' ) 
           setYear(null);
        else 
           setYear(new Date(noticia.fields.year.toString()));
           
    
        if (noticia.fields.fh_public === null ||  noticia.fields.fh_public === '') 
              setFhPublic(null); 
        else 
            setFhPublic(new Date(noticia.fields.fh_public.toString()));
    
        
        if (noticia.fields.fh_desactivacion != null ||  noticia.fields.fh_desactivacion === '') 
        setFhDesact(null); 
        else 
        setFhDesact(new Date(noticia.fields.fh_desactivacion.toString()));
  
            
        if (noticia.fields.fh_portada != null) 
        setFhportada(null);  
        else 
        setFhportada(new Date(noticia.fields.fh_portada.toString()));
        
        if (noticia.fields.tipo_referencia == 'ENT') 
            setTref({value: 'ENT', label: 'Entidad'});
        else if (noticia.fields.tipo_referencia == 'LAB') 
            setTref({value: 'LAB', label: 'Laboratorio'});
        else 
            setTref(noticia.fields.tipo_referencia);

        } 
    , [categorias, noticia])

    const setFormValue = (field, value) => {

        let fields = {
            ...noticia.fields,
            [field]: value
        };

        let new_noticia = {
            ...noticia,
            fields
        }

        saveState(new_noticia);

    }

    const {
        atcs,
        obtieneAtcs,

        medicamentos,
        obtieneMedicamentos,
        enfermedades,
        obtieneEnfermedades,
        laboratorios,
        obtieneLaboratorios,
        entidades,
        obtieneEntidades

    } = useContext(FormContext);

    return (
        <Fragment>

            <Container fuid="true" className="EditorFormPage m-0 p-0 mb-1">

                <Row className="m-0 p-1">
                    <Col xs="6" md="3" className="m-0 p-0 py-0 pr-1">

                        <div className="label">Año:</div>
                        <DatePicker
                            selected={year}
                            value={year}
                            className="text-center"
                            onChange={date => {
                            setYear(date);
                            setFormValue('year', date)
                        }}
                            locale="es"
                            showYearPicker
                            dateFormat="yyyy"
                            placeholderText=""/>

                    </Col>

                    <Col xs="6" md="3" className="m-0 p-0 py-0 pr-1">

                        <div className="label">Publicacion:</div>
                        <DatePicker
                            selected={fhpublic}
                            value={fhpublic}
                            className="text-center"
                            onChange={date => {
                            setFormValue('fh_public', date)
                        }}
                            locale="es"
                            dateFormat="dd-MM-yyyy"
                            placeholderText=""/>

                    </Col>
                    <Col xs="6" md="3" className="m-0 p-0 py-0 pr-1">

                        <div className="label">Desactivación:</div>
                        <DatePicker
                            selected={fhdesact}
                            value={fhdesact}
                            className="text-center"
                            onChange={date => {
                            setFormValue('fh_desactivacion', date)
                        }}
                            locale="es"
                            dateFormat="dd-MM-yyyy"
                            placeholderText=""/>

                    </Col>

                    <Col xs="6" md="3" className="m-0 p-0 py-0 pr-0">

                        <div className="label">En Portada hasta:</div>
                        <DatePicker
                            selected={fhportada}
                            value={fhportada}
                            className="text-center"
                            onChange={date => {
                            setFormValue('fh_portada', date)
                        }}
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
                                onChange={e => {
                                setTref(e);
                                setFormValue('tipo_referencia', e)
                            }}
                                value={tref}
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

                    <Col xs="5" md="6" className="m-0 pr-1 p-0">

                        <div className="select-container">
                            <Label>Categoria:</Label>
                            <Select
                                onChange={e => {
                                setKeywords({
                                    ...keywords,
                                    'Categoria': e.label
                                });
                                setFormValue('id_categoria', e);
                            }}
                                value={selecCat}
                                options={defaultCat}
                                placeholder={""}/>
                        </div>
                    </Col>

                    <Col xs="7" md="6" className="m-0 p-0">

                        <Label for="exampleEmail">Palabra clave:</Label>
                        <Input
                            onBlur={e => setKeywords({
                            ...keywords,
                            'Palabra clave': e.target.value
                        })}
                            onChange={e => setFormValue(e.target.name, e.target.value)}
                            type="text"
                            name="palabra_clave"
                            id="palabra_clave"
                            value={noticia.fields.palabra_clave}
                            placeholder={""}/>

                    </Col>

                </Row>

            </Container>

            <Container fuid="true" className="EditorFormPage m-0 p-0">
                <Row className="m-0 p-1 ">
                    <Col xs="6" className="m-0 p-0 ">

                        <div className="toggle-container  d-flex">
                            <Toggle
                                id='ib_visible'
                                name='ib_visible'
                                defaultChecked={!!noticia.fields.ib_visible}
                                onChange={e => setFormValue('ib_visible', e.target.checked
                                ? 1
                                : 0)}/>
                            <div className="label mx-1">Mostrar</div>

                        </div>

                    </Col>
                    <Col xs="6" className="m-0 p-0 ">

                        <div className="toggle-container  d-flex">
                            <Toggle
                                id='ib_boletin'
                                name='ib_boletin'
                                defaultChecked={!!noticia.fields.ib_boletin}
                                onChange={e => setFormValue('ib_boletin', e.target.checked
                                ? 1
                                : 0)}/>
                            <div className="label mx-1">Incluir en el boletín</div>

                        </div>

                    </Col>
                </Row>

                <Row className="m-0 p-0 px-1 py-1">
                    <Col xs="6" className="m-0 p-0 ">

                        <div className="toggle-container d-flex">
                            <Toggle
                                id='profesionales'
                                name='profesionales'
                                defaultChecked={noticia.fields.profesionales === 1
                                ? true
                                : false}
                                onChange={e => setFormValue('profesionales', e.target.checked
                                ? 1
                                : 0)}/>
                            <div className="label mx-1">Profesionales</div>

                        </div>

                    </Col>
                    <Col xs="6" className="m-0 p-0 ">

                        <div className="toggle-container d-flex">
                            <Toggle
                                id='ib_destacado'
                                name='ib_destacado'
                                defaultChecked={!!noticia.fields.ib_destacado}
                                onChange={e => setFormValue('ib_destacado', e.target.checked
                                ? 1
                                : 0)}/>
                            <div className="label mx-1">Destacado</div>

                        </div>

                    </Col>
                </Row>

            </Container>

            <AttachFiles type={type} noticia={noticia} setNoticia={setNoticia}/>

            <SelectComponents
                type={type}
                label={'medicamentos'}
                tipo={"drugs"}
                noticia={noticia}
                guardaNoticia={setNoticia}
                opciones={medicamentos}
                obtieneOpciones={obtieneMedicamentos}/>

            <SelectComponents
                type={type}
                label={'atcs'}
                tipo={"atcs"}
                noticia={noticia}
                guardaNoticia={setNoticia}
                opciones={atcs}
                obtieneOpciones={obtieneAtcs}/>

            <SelectComponents
                type={type}
                label={'enfermedades'}
                tipo={"diseases"}
                noticia={noticia}
                guardaNoticia={setNoticia}
                opciones={enfermedades}
                obtieneOpciones={obtieneEnfermedades}/>

            <SelectComponents
                type={type}
                label={'laboratorios'}
                tipo={"laboratories"}
                noticia={noticia}
                guardaNoticia={setNoticia}
                opciones={laboratorios}
                obtieneOpciones={obtieneLaboratorios}/>

            <SelectComponents
                type={type}
                label={'entidades'}
                tipo={'entities'}
                noticia={noticia}
                guardaNoticia={setNoticia}
                opciones={entidades}
                obtieneOpciones={obtieneEntidades}/> {type === 'nueva_noticia'
                ? <ImgBank keywords={keywords}/>
                : null}

        </Fragment>
    )
}

export default EditorFieldsFormPage;