import React, {useState,Fragment} from 'react';
import {
    Container,
    Col,
    Button,
    Row,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import Toggle from 'react-toggle'
import "react-toggle/style.css";
import AsyncSelect, {components} from 'react-select/async';
import {IconDelete, IconAdd} from '../config/select_config';

const SelectComponent = ({
    type,
    label,
    tipo,
    noticia,
    guardaNoticia,
    opciones,
    obtieneOpciones
}) => {

    let async_component;

    const [opcionesDefecto,
        estableceOpcionesDefecto] = useState([]);

    const [notOptionsMsg,
        setNotOptionsMsg] = useState("Sin Opciones")


    const saveState = (new_noticia) => {

        sessionStorage.setItem(type, JSON.stringify(new_noticia));
        guardaNoticia(new_noticia);
    }    

    const setLinkActive = (tipo, value) => {

        let new_noticia = {
            ...noticia
        };
        new_noticia[tipo]['active'] = value;
        saveState(new_noticia);

        if (value === 0) 
            deleteAll(tipo);

        }
    
    const setOpcion = (tipo, values) => {

        let new_noticia = {
            ...noticia
        };
        let a_value = values[values.length - 1];

        new_noticia[tipo]['list'].push(a_value);

        saveState(new_noticia);
    }

    const searchOptions = (inputValue) => {

        let options = [];

        if (inputValue.length >= 3) {

            obtieneOpciones(inputValue);

            opciones.map((value) => {

                if (value.label.toLowerCase().includes(inputValue.toLowerCase())) {

                    let new_label = value.label;
                    if (tipo == 'atcs') 
                        new_label = value.id + " - " + new_label;
                    options.push({value: value.id, label: new_label});

                }

            });

            setNotOptionsMsg(`Sin resultados para ${inputValue}`);
            estableceOpcionesDefecto(options);

        } else {
            setNotOptionsMsg(`El termino de busqueda debe tener al menos 4 caracteres`);
        }

        return options;

    }

    const loadOptions = (inputValue, callback) => {

        setTimeout(() => {
            callback(searchOptions(inputValue));
        }, 1);
    };

    const deleteOption = (tipo, id) => {

        let new_noticia = {
            ...noticia
        };
        new_noticia[tipo]['list'] = noticia[tipo]['list'].filter(drug => drug.value !== id);

        let new_values = async_component
            .select
            .state
            .value
            .filter(val => val.value !== id);
        async_component.select.state.value = new_values;

        saveState(new_noticia);
    }

    const deleteAll = (tipo) => {

        let new_noticia = {
            ...noticia
        };
        new_noticia[tipo]['list'] = [];

        async_component.select.state.value = [];
        saveState(new_noticia);
    }

    

    const Svg = p => (<svg
        width="24"
        height="24"
        viewBox="0 0 30 16"
        focusable="false"
        stroke='#000'
        fill='#eee'
        style={{
        'display': 'none'
    }}
        role="presentation"
        {...p}/>);

    const DropdownIndicator = () => {

        const hiddenSearch = () => {

            async_component.state.defaultOptions = [];

        }

        return (
            <Fragment>
                <div onClick={hiddenSearch}>
                    <div className="p-0">
                        <Svg>
                            <path
                                fillRule="evenodd"
                                d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-4.146-3.146a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z"
                                clipRule="evenodd"></path>
                        </Svg>
                    </div>
                </div>
            </Fragment>
        )
    };

    return (
        <Container fuid="true" className="EditorFormPage m-0 mt-1 p-0">

            <Row className="m-0 p-1">
                <Col xs="12" className="m-0 p-0 ">

                    <div className="toggle-container">

                        <Toggle
                            id="Atcs_active"
                            name="Atcs_active"
                            defaultChecked={!!noticia[tipo]['active']}
                            onChange=
                            {e=> { setLinkActive(tipo, e.target.checked ? 1 : 0) }}/>
                        <label>Vincular {label}</label>

                        {noticia[tipo]['active'] == 1
                            ? <Fragment>

                                    <Button
                                        style={noticia[tipo]['list'] !== null && noticia[tipo]['list'].length <= 0
                                        ? {
                                            'display': 'none'
                                        }
                                        : null}
                                        onClick={e => deleteAll(tipo)}>{IconDelete}Borrar todo</Button>

                                    <br/></Fragment>
                            : null}

                    </div>

                    <div
                        className={noticia[tipo]['active'] == 1
                        ? 'select-container my-1 d-block'
                        : 'select-container my-1 d-none'}>

                        <AsyncSelect
                            className={noticia[tipo]['active'] == 1
                            ? 'isRelative d-block'
                            : 'isRelative d-none'}
                            ref={elem => async_component = elem}
                            isMulti
                            onChange={(e, a) => {
                            if (a.action == "select-option") 
                                setOpcion(tipo, e);
                            }}
                            components={{
                            DropdownIndicator
                        }}
                            isClearable={false}
                            loadOptions={loadOptions}
                            openMenuOnClick={false}
                            onInputChange=
                            {texto=>setNotOptionsMsg(`Sin resultados para: ${texto}`)}
                            defaultOptions={[]}
                            placeholder={`Buscar ${label}`}
                            loadingMessage=
                            {(texto) =>`Buscando ${label} para el termino: ${texto.inputValue} ...`}
                            noOptionsMessage={texto => notOptionsMsg}/>

                    </div>

                </Col>
                {noticia[tipo]['active'] == 1 && noticia[tipo]['list'] !== null && noticia[tipo]['list'].length >= 1
                    ? <Col xs="12" className="m-0 p-0">

                            <ListGroup className="listGroup m-0 p-0 pt-1">

                                {noticia[tipo]['list'].map((val, key) => {
                                    return <ListGroupItem className="m-0 mb-1 p-1" key={val.value}>
                                        <div className="d-flex">
                                            <div>{val.label}</div>
                                            <div onClick={e => deleteOption(tipo, val.value)} className="float-right">{IconDelete}</div>
                                        </div>
                                    </ListGroupItem>
                                })
}

                            </ListGroup>
                        </Col>
                    : null}

            </Row>

        </Container>
    );
}

export default SelectComponent;