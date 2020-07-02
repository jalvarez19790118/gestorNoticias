import React, { useContext, useState, useEffect, Fragment } from 'react';
import { FormContext } from '../../../context/FormContext';
import { Container, Col, Row, Input, Label } from 'reactstrap';

import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import Select from 'react-select';

import AttachFiles from './attachComponents/AttachFiles';
import ImgBank from './imgComponents/ImgBank';
import SelectComponents from './selectComponents/SelectComponent';
import Divider from '@material-ui/core/Divider';

registerLocale('es', es);

const EditorFieldsFormPage = ({ type }) => {


  
 
  const {
    atcs,
    obtieneAtcs,
    categorias,
    obtieneCategorias,  
    noticia, 
    setNoticia,
    palabras,
    obtienePalabras,
    banco,
    obtieneBanco,
    medicamentos,
    obtieneMedicamentos,
    enfermedades,
    obtieneEnfermedades,
    laboratorios,
    obtieneLaboratorios,
    entidades,
    obtieneEntidades,
    relacionImagen,
    obtieneRelacionImagen,
    changeFields,
    setChangefields
   
  } = useContext(FormContext);

  
  const [defaultCat, setdefaultCat] = useState([]);
  const [selecCat, setSelectCat] = useState(null);
  const [year, setYear] = useState(null);
  const [fhpublic, setFhPublic] = useState(null);
  const [fhdesact, setFhDesact] = useState(null);
  const [fhportada, setFhportada] = useState(null);
  const [tref, setTref] = useState(null);
  const [labo, setLabo] = useState('');
  const [keyword, setKeyword] = useState(null);
  const [defaultKey, setdefaultKey] = useState([]);
  const [ibVisible, setIbVisible] = useState(!!parseInt(noticia.ib_visible));
  const [ibDestacado, setIbDestacado] = useState(!!parseInt(noticia.ib_destacado));
  const [ibProfesionale, setIbProfesionales] =useState(!!parseInt(noticia.profesionales));
  const [ibBoletin, setIbBoletin] = useState(!!parseInt(noticia.ib_boletin));


  useEffect(() => {


    
    if (noticia.year === null || noticia.year === '') setYear(null);
    else setYear(new Date(noticia.year.toString()));

   
    if (noticia.fh_public === null || noticia.fh_public === '') setFhPublic(null);
    else setFhPublic(new Date(noticia.fh_public.toString()));

  
    if (noticia.fh_desactivacion === null || noticia.fh_desactivacion === '') setFhDesact(null);
    else setFhDesact(new Date(noticia.fh_desactivacion.toString()));

    if (noticia.fh_portada === null || noticia.fh_portada === '' ) setFhportada(null);
    else setFhportada(new Date(noticia.fh_portada.toString()));

    if (noticia.tipo_referencia == 'ENT') setTref({ value: 'ENT', label: 'Entidad' });
    else if (noticia.tipo_referencia == 'LAB') setTref({ value: 'LAB', label: 'Laboratorio' });
    else setTref(noticia.tipo_referencia);

    setLabo(noticia.nom_labo_entidad);
    setKeyword(noticia.palabra_clave);

    setIbVisible(!!parseInt(noticia.ib_visible));
    setIbDestacado(!!parseInt(noticia.ib_destacado));
    setIbProfesionales(!!parseInt(noticia.profesionales));
    setIbBoletin(!!parseInt(noticia.ib_boletin));
   

  
  }, [noticia]);


    useEffect(() => {


     
    if (categorias.length > 0) {
      let options_cat = [];

      options_cat.push({value: 0, label : '-'});
      
      
      categorias.map((value, key) => {
        options_cat.push({
          value: value.id,
          label: value.categoria.toLowerCase().charAt(0).toUpperCase() + value.categoria.toLowerCase().slice(1),
        });
      });

      setdefaultCat(options_cat);

      if (parseInt(noticia.id_categoria) > 0) {
        let option = options_cat.filter((v, k) => v.value === noticia.id_categoria);
        setSelectCat(option[0]);
      } else setSelectCat(noticia.id_categoria);
    }

    if (palabras.length > 0) {
      let options_key = [];

  

      options_key.push({value: 0, label : '-'});

      palabras.map((value, key) => {
        options_key.push({
          value: value.id,
          label: value.palabra,
        });
      });

      setdefaultKey(options_key);

     

      if (noticia.palabra_clave.length > 0) {

     
        let option = options_key.filter((v, k) => v.label === noticia.palabra_clave);
        setKeyword(option[0]);
      } else setKeyword(0);
    }

  },[noticia]);



  const setFormValue = (field, value) => {
  

    let new_noticia = {
      ...noticia,
    };

    

    new_noticia[field] = value;

   let cf = {...changeFields};

   cf[field] = value;

   setChangefields(cf);

   setNoticia(new_noticia);

  

    
  };




  return (
    <Fragment>
      <Container fuid="true" className="EditorFormPage m-0 p-0 mb-1 ml-1">
        <Row className="m-0 p-1">
          <Col xs="6" md="3" className="m-0 p-0 py-0 pr-1">
            <div className="label">Año:</div>
            <DatePicker
              selected={year}
              value={year}
              className="text-center"
              onChange={(date) => {
                setYear(date);
                setFormValue('year', date);
              }}
              locale="es"
              showYearPicker
              dateFormat="yyyy"
              placeholderText=""
            />
          </Col>

          <Col xs="6" md="3" className="m-0 p-0 py-0 pr-1">
            <div className="label">Publicacion:</div>
            <DatePicker
              selected={fhpublic}
              value={fhpublic}
              className="text-center"
              onChange={(date) => {

                setFhPublic(date);
                setFormValue('fh_public', date);

                let dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
                let [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date);
                sessionStorage.setItem('selec_date', `${year}-${month}-${day}`);
              }}
              locale="es"
              dateFormat="dd-MM-yyyy"
              placeholderText=""
            />
          </Col>
          <Col xs="6" md="3" className="m-0 p-0 py-0 pr-1">
            <div className="label">Desactivación:</div>
            <DatePicker
              selected={fhdesact}
              value={fhdesact}
              className="text-center"
              onChange={(date) => {
                setFhDesact(date);
                setFormValue('fh_desactivacion', date);
              }}
              locale="es"
              dateFormat="dd-MM-yyyy"
              placeholderText=""
            />
          </Col>

          <Col xs="6" md="3" className="m-0 p-0 py-0 pr-0">
            <div className="label">En Portada hasta:</div>
            <DatePicker
              selected={fhportada}
              value={fhportada}
              className="text-center"
              onChange={(date) => {
                setFhportada(date);
                setFormValue('fh_portada', date);
              }}
              locale="es"
              dateFormat="dd-MM-yyyy"
              placeholderText=""
            />
          </Col>
        </Row>

        <Row className="m-0 p-0 px-1 pb-1 ">
          <Col xs="3" className="m-0 p-0 pr-1 py-0">
            <div className="select-container">
              <Label for="exampleEmail">Tipo:</Label>

              <Select
                onChange={(e) => {
                  setTref(e);
                  setFormValue('tipo_referencia', e.value);
                }}
                value={tref}
                options={[
                  {
                    value: 'ENT',
                    label: 'Entidad',
                  },
                  {
                    value: 'LAB',
                    label: 'Laboratorio',
                  },
                ]}
                placeholder={''}
              />
            </div>
          </Col>

          <Col xs="9" className="m-0 p-0 py-0">
            <Label for="exampleEmail">Entidad/Laboratorio:</Label>
            <Input
              onChange={(e) => {
                setLabo(e.target.value);
                setFormValue('nom_labo_entidad', e.target.value)
                }}

              type="text"
              name="nom_labo_entidad"
              id="nom_labo_entidad"
              value={labo}
              placeholder=""
            />
          </Col>
        </Row>

        <Row className="m-0 p-1 ">
          <Col xs="5" md="6" className="m-0 pr-1 p-0">
            <div className="select-container">
              <Label>Categoria:</Label>
              <Select
                onChange={(e) => {
             

             setSelectCat(e);
                  
                  setFormValue('id_categoria', e.value);
                 // setFormValue('desc_categoria', e.label);
                }}
                value={selecCat}
                options={defaultCat}
                placeholder={''}
              />
            </div>
          </Col>

          <Col xs="7" md="6" className="m-0 p-0">
          <div className="select-container">
            <Label for="exampleEmail">Palabra clave:</Label>
          
            <Select
                onChange={(e) => {

              //  setKeyword(e);


                let new_noticia = {
                ...noticia,
                };

                new_noticia['palabra_clave'] = e.label;
                new_noticia['id_imagen'] = e.value;
                let cf = {...changeFields};

                cf['palabra_clave'] = e.label;
                cf['id_imagen'] =e.value;
                setChangefields(cf);


                setNoticia(new_noticia);

                }}
                value={keyword}
                options={defaultKey}
                placeholder={''}
              />

</div>
          </Col>
        </Row>
      </Container>

      <Divider  className="ml-2"/>

      <Container fuid="true" className="EditorFormPage m-0 p-0 ml-1">
        <Row className="m-0 p-1 ">


          
          <Col xs="6" className="m-0 p-0 ">
            <div className="toggle-container  d-flex">
              <Toggle
                id="ib_visible"
                name="ib_visible"
                checked={ibVisible}
                onChange={(e) => {
                
                setIbVisible(e.target.checked);
                setFormValue('ib_visible', e.target.checked ? 1 : 0)
                } 
                }
              />
              <div className="label mx-1">Mostrar</div>
            </div>
          </Col>
          <Col xs="6" className="m-0 p-0 ">
            <div className="toggle-container  d-flex">
              <Toggle
                id="ib_boletin"
                name="ib_boletin"
                checked={ibBoletin}
                onChange={(e) => {
                  setIbBoletin(e.target.checked);
                  setFormValue('ib_boletin', e.target.checked ? 1 : 0)
                  }}
              />
              <div className="label mx-1">Incluir en el boletín</div>
            </div>
          </Col>
        </Row>

        <Row className="m-0 p-0 px-1 py-1">
          <Col xs="6" className="m-0 p-0 ">
            <div className="toggle-container d-flex">
              <Toggle
                id="profesionales"
                name="profesionales"
                checked={ibProfesionale}
                onChange={(e) => { 
                  setIbProfesionales(e.target.checked);
                  setFormValue('profesionales', e.target.checked ? 1 : 0)
                  }}
              />
              <div className="label mx-1">Profesionales</div>
            </div>
          </Col>
          <Col xs="6" className="m-0 p-0 ">
            <div className="toggle-container d-flex">
              <Toggle
                id="ib_destacado"
                name="ib_destacado"
                checked={ibDestacado}
                onChange={(e) => {
                  setIbDestacado(e.target.checked);
                  setFormValue('ib_destacado', e.target.checked ? 1 : 0)
                  }}
              />
              <div className="label mx-1">Destacado</div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* 
      <AttachFiles type={type} noticia={noticia} setNoticia={setNoticia} />

      */}
      <Divider  className="ml-2"/>
      <SelectComponents
         
        type={type}
        label={'medicamentos'}
        tipo={'medicamentos'}
        opciones={medicamentos}
        obtieneOpciones={obtieneMedicamentos}
      />

      <Divider  className="ml-2"/>

      <SelectComponents 
        type={type} 
        label={'atcs'} 
        tipo={'atc'} 
        opciones={atcs} 
        obtieneOpciones={obtieneAtcs} 
      />
    
      <Divider  className="ml-2"/>
      <SelectComponents
        type={type}
        label={'enfermedades'}
        tipo={'enfermedad'}
        opciones={enfermedades}
        obtieneOpciones={obtieneEnfermedades}
      />

      <Divider  className="ml-2"/>
      <SelectComponents
        type={type}
        label={'laboratorios'}
        tipo={'laboratorio'}
        opciones={laboratorios}
        obtieneOpciones={obtieneLaboratorios}
      />
      <Divider  className="ml-2"/>
      <SelectComponents
        type={type}
        label={'entidades'}
        tipo={'entidad'}
        opciones={entidades}
        obtieneOpciones={obtieneEntidades}
      />

      <Divider  className="ml-2"/>



      {Array.isArray(relacionImagen) ? <ImgBank idImagen={noticia.id_imagen} relaImg={relacionImagen} banco={banco} keyword={keyword} categoria={selecCat}  indicaciones={noticia['enfermedad']} /> : null }


    </Fragment>
  );
};

export default EditorFieldsFormPage;
