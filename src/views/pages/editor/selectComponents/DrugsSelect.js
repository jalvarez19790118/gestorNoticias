import React, {useState, useContext, Fragment} from 'react';
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
import MyIcon from '../../../../vibe/components/SidebarNav/components/MyIcon';
import {FormContext} from '../../../../context/FormContext';

const DrugsSelect = ({noticia, setNoticia}) => {

    let async_component;

    const {medicamentos,obtieneMedicamentos} = useContext(FormContext);

    const [defaultDrugs,
        setdefaultDrugs] = useState([]);

    const [notOptionsMsg,
        setNotOptionsMsg] = useState("Sin Opciones")

    const [showAsyncEspec,
        setShowAsyncEspec] = useState(false);

    const setLinkActive = (link, value) => {

        let new_noticia = {
            ...noticia
        };
        new_noticia[link]['active'] = value;
        setNoticia(new_noticia);

        if (value === 0) 
            deleteAllDrugs();
        setShowAsyncEspec(false);
    }

    const setDrugs = (values) => {

        let new_noticia = {

            ...noticia,
            drugs: {
                active: noticia.drugs.active,
                list: values
            }
        }

        setNoticia(new_noticia);
    }

    /* Buscador Especialidades Medicas */
    const busquedaDrugs = (inputValue) => {

        
        let options = [];


      
        if (inputValue.length >= 3) {

            obtieneMedicamentos(inputValue);
           
    

            
            medicamentos.map((value) => {

                
                
                if (value.name.toLowerCase().includes(inputValue.toLowerCase())) {
                    options.push({value: value.productId, label: value.name});

                }

            });

          
            setNotOptionsMsg(`Sin resultados para ${inputValue}`);
            setdefaultDrugs(options);
           

        } else {
            setNotOptionsMsg(`El termino de busqueda debe tener al menos 4 caracteres`);
        }

        return options;

    }

    const loadOptions = (inputValue, callback) => {

        setTimeout(() => {
            callback(busquedaDrugs(inputValue));
        }, 1);
    };

    
    const deleteDrug = id => {

        let new_noticia = {

            ...noticia,
            especialities: {
                active: noticia.drugs.active,
                list: noticia
                    .drugs
                    .list
                    .filter(drug => drug.value !== id)
            }
        }

        let new_values = async_component
            .select
            .state
            .value
            .filter(val => val.value !== id);
        async_component.select.state.value = new_values;

        setNoticia(new_noticia);
    }

    const deleteAllDrugs = () => {

        let new_noticia = {

            ...noticia,
            drugs: {
                active: noticia.drugs.active,
                list: []
            }
        }

        async_component.select.state.value = [];

        setNoticia(new_noticia);
    }

    const styleObj = {
        'fontSize': '16px',
        'cursor': 'pointer'
    };

    const IconDelete = <MyIcon
        item={{
        lib: 'Bs',
        name: 'BsFillXCircleFill',
        style: styleObj
    }}/>;

    const IconAdd = <MyIcon
        item={{
        lib: 'Bs',
        name: 'BsFillPlusCircleFill',
        style: {
            'color': '#fff',
            'marginLeft': '5px'
        }
    }}/>;

    const Svg = p => (<svg
        width="24"
        height="24"
        viewBox="0 0 19 16"
        focusable="false"
        role="presentation"
        {...p}/>);

    const DropdownIndicator = () => {

        const hiddenSearch = () => {

            async_component.state.defaultOptions = [];
            setShowAsyncEspec(false);
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
                            id="drugs_active"
                            name="drugs_active"
                            defaultChecked={!!noticia.drugs.active}
                            onChange=
                            {e=> { setLinkActive("drugs", e.target.checked ? 1 : 0) }}/>
                        <label>Vincular medicamentos</label>

                        {noticia.drugs.active == 1
                            ? <Fragment>
                                    <Button onClick={e => deleteAllDrugs()}>{IconDelete}Borrar todo</Button>
                                    <Button
                                        className={showAsyncEspec
                                        ? 'd-none'
                                        : 'd-block'}
                                        onClick={e => {
                                        setShowAsyncEspec(true)
                                    }}>{IconAdd}Añadir</Button>

                                    <br/></Fragment>
                            : null}

                    </div>

                    <div
                        className={showAsyncEspec
                        ? 'select-container my-1 d-block'
                        : 'select-container my-1 d-none'}>

                        <AsyncSelect
                            className={showAsyncEspec
                            ? 'isRelative d-block'
                            : 'isRelative d-none'}
                            ref={elem => async_component = elem}
                            isMulti
                            onChange={(e, a) => {
                            if (a.action == "select-option") 
                                setDrugs(e);
                            setShowAsyncEspec(false);
                        }}
                            components={{
                            DropdownIndicator
                        }}
                            isClearable={false}
                            loadOptions={loadOptions}
                            openMenuOnClick={false}
                            onInputChange=
                            {texto=>setNotOptionsMsg(`Sin resultados para ${texto}`)}
                            defaultOptions={[]}
                            placeholder={"Buscar medicamentos"}
                            loadingMessage=
                            {(texto) =>`Buscando resultados para ${texto.inputValue} ...`}
                            noOptionsMessage={texto => notOptionsMsg}/>

                    </div>

                </Col>
                {noticia.drugs.active == 1 && noticia.drugs.list !== null && noticia.drugs.list.length >= 1
                    ? <Col xs="12" className="m-0 p-0">

                            <ListGroup className="listGroup m-0 p-0 pt-1">

                                {noticia
                                    .drugs
                                    .list
                                    .map((val, key) => {
                                        return <ListGroupItem className="m-0 mb-1 p-1" key={val.value}>
                                            <div className="d-flex">
                                                <div>{val.label}</div>
                                                <div onClick={e => deleteDrug(val.value)} className="float-right">{IconDelete}</div>
                                            </div>
                                        </ListGroupItem>
                                    })
}

                            </ListGroup>
                        </Col>
                    : null}

            </Row>

        </Container>

    )
}

export default DrugsSelect;
