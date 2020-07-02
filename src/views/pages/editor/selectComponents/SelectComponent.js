import React, { useState, Fragment, useContext,useEffect } from 'react';
import { Container, Col, Button, Row, ListGroup, ListGroupItem } from 'reactstrap';

import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import AsyncSelect from 'react-select/async';
import { IconDelete } from '../config/select_config';
import { FormContext } from '../../../../context/FormContext';

const SelectComponent = ({ type, label, tipo, opciones, obtieneOpciones }) => {
  let async_component;

  const [opcionesDefecto, estableceOpcionesDefecto] = useState([]);

  const { noticia, setNoticia,  changeFields, setChangefields } = useContext(FormContext);


 
  const [notOptionsMsg, setNotOptionsMsg] = useState('Sin Opciones');
  const [isActive, setIsActive] = useState(noticia[tipo].length > 0);
  const [selectList, setSelectList] = useState(noticia[tipo]);

  
  const saveState = (new_noticia) => {
   // setNoticia(new_noticia);
    sessionStorage.setItem(type, JSON.stringify(new_noticia));
  };

  const setLinkActive = (tipo, value) => {


    if (value === 0) deleteAll(tipo);
   
  };

  const setOpcion = (tipo, values) => {

  
    let new_noticia = {
      ...noticia
    };
    
    let a_value = values[values.length - 1];

     
     a_value['id'] = a_value.value;
     a_value['nombre'] = a_value.label;
     
     delete a_value['label']
     delete a_value['value']

    new_noticia[tipo].push(a_value);

   
  let cf = {...changeFields};

  cf[tipo] = new_noticia[tipo];


  setChangefields(cf)


    setSelectList(new_noticia[tipo]);
 
   setNoticia(new_noticia);
    
  };


  useEffect(() => {

    setIsActive(noticia[tipo].length > 0);
    setSelectList(noticia[tipo]);

  },[noticia]);

  const searchOptions = (inputValue) => {
    let options = [];

    if (inputValue.length >= 3) {
      obtieneOpciones(inputValue);


      opciones.map((value) => {
        if (value.label.toLowerCase().includes(inputValue.toLowerCase())) {
          let new_label = value.label;
          if (tipo == 'atc') new_label = value.id + ' - ' + new_label;
          options.push({ value: value.id, label: new_label });
        }
      });

      setNotOptionsMsg(`Sin resultados para ${inputValue}`);
      estableceOpcionesDefecto(options);
    } else {
      setNotOptionsMsg(`El termino de busqueda debe tener al menos 4 caracteres`);
    }

    return options;
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(searchOptions(inputValue));
    }, 1);
  };

  const deleteOption = (tipo, id) => {

 
    let new_noticia = {
      ...noticia
    };
   
  
    new_noticia[tipo] = selectList.filter((drug) => drug.id !== id);
    setNoticia(new_noticia);

    let cf = {...changeFields};

    cf[tipo] = new_noticia[tipo];
  
    setChangefields(cf)

    


    setSelectList(new_noticia[tipo]);
    setNoticia(new_noticia);
   
  };

  const deleteAll = (tipo) => {

  let new_noticia = {
      ...noticia
    };
    new_noticia[tipo] = [];
 

    setNoticia(new_noticia);

    let cf = {...changeFields};

    cf[tipo] = new_noticia[tipo];
  
    setChangefields(cf)
    
    setSelectList([]);
    setNoticia(new_noticia);
  
  };

  const Svg = (p) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 30 16"
      focusable="false"
      stroke="#000"
      fill="#eee"
      style={{
        display: 'none',
      }}
      role="presentation"
      {...p}
    />
  );

  const DropdownIndicator = () => {
    const hiddenSearch = () => {
      async_component.state.defaultOptions = [];
    };

    return (
      <Fragment>
        <div onClick={hiddenSearch}>
          <div className="p-0">
            <Svg>
              <path
                fillRule="evenodd"
                d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-4.146-3.146a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z"
                clipRule="evenodd"
              ></path>
            </Svg>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Container fuid="true" className="EditorFormPage m-0 mt-1 p-0 ml-1">
      <Row className="m-0 p-1">
        <Col xs="12" className="m-0 p-0 ">
          <div className="toggle-container">
            <Toggle
              checked={isActive}
              onChange={(e) => {
                setIsActive(e.target.checked);
                setLinkActive(tipo, e.target.checked ? 1 : 0);
              }}
            />
            <label>Vincular {label}</label>

            {isActive ? (
              <Fragment>
                <Button
                  style={
                   selectList !== null && selectList.length <= 0
                      ? {
                          display: 'none',
                        }
                      : null
                  }
                  onClick={(e) => {deleteAll(tipo)}}
                >
                  {IconDelete}Borrar todo
                </Button>

                <br />
              </Fragment>
            ) : null}
          </div>

          <div
            className={isActive ? 'select-container my-1 d-block' : 'select-container my-1 d-none'}
          >
            <AsyncSelect
              className={isActive ? 'isRelative d-block' : 'isRelative d-none'}
              ref={(elem) => (async_component = elem)}
              isMulti
              onChange={(e, a) => {
                if (a.action == 'select-option') setOpcion(tipo, e);
              }}
              components={{
                DropdownIndicator,
              }}
              isClearable={false}
              loadOptions={loadOptions}
              openMenuOnClick={false}
              onInputChange={(texto) => setNotOptionsMsg(`Sin resultados para: ${texto}`)}
              defaultOptions={[]}
              placeholder={`${label}`}
              loadingMessage={(texto) => `Buscando ${label} para el termino: ${texto.inputValue} ...`}
              noOptionsMessage={(texto) => notOptionsMsg}
            />
          </div>
        </Col>

        {isActive && selectList !== null && selectList.length >= 1 ? (
          <Col xs="12" className="m-0 p-0">
            <ListGroup className="listGroup m-0 p-0 pt-1">
              {selectList.map((val, key) => {
                return (
                  <ListGroupItem className="m-0 mb-1 p-1" key={val.id}>
                    <div className="d-flex">
                      <div>{ val.nombre }</div>
                      <div onClick={(e) => deleteOption(tipo, val.id)} className="float-right">
                        
      
                        {IconDelete}
                      </div>
                    </div>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Col>
        ) : null}
      </Row>
    </Container>
  );
};

export default SelectComponent;
