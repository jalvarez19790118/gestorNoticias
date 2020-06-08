import React, { useContext, useEffect, Fragment, useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { btnList, btnList2 } from './config/editor_config';
import { Container, Col, Row, Form, FormGroup, Input, Label, CardBody } from 'reactstrap';

import { MyContext } from '../../../context/MyContext';
import { FormContext } from '../../../context/FormContext';

import $ from 'jquery';

const EditorSunFormPage = ({ type, noticia, setNoticia }) => {
  let ref_entradilla = null;
  let ref_titular = null;
  let ref_contenido_html = null;

  const { vacios, verifyFields } = useContext(FormContext);

  const { wheight } = useContext(MyContext);

  useEffect(() => {
    let he = $(ref_entradilla).height();
    let ht = $(ref_titular).height();
    let hc = $(ref_contenido_html).find('.se-toolbar').height();

    let new_height = `${wheight - (he + ht + hc + 130)}px`;

    $('.EditorContenido .se-wrapper-wysiwyg').css({ 'min-height': `${new_height}` });
  });

  const saveState = (new_noticia) => {
    sessionStorage.setItem(type, JSON.stringify(new_noticia));
  };

  const setFormValue = (field, value) => {
    let new_noticia = {
      ...noticia,
    };

    new_noticia.fields[field] = value;

    //verifyFields(new_noticia);

    saveState(new_noticia);
  };

  return (
    <Fragment>
      <Container fuid="true" className="EditorFormPage m-0 p-0">
        <Form>
          <Row className="m-0 px-1 pb-1 pt-0">
            <Col sm="12" className="m-0 p-0 py-0">
              <div ref={(div) => (ref_titular = div)}>
                <FormGroup
                  className={vacios.includes('titular') ? 'p-0 EditorTitular emptyField' : 'p-0 EditorTitular'}
                >
                  <Label for="exampleEmail">
                    Titular
                    {vacios.includes('titular') ? <span>*</span> : null}:
                  </Label>
                  {vacios.length > 0 ? (
                    <div className="float-right mandatory-field mr-1 mt-1">* Campo obligatorio </div>
                  ) : null}
                  <SunEditor
                    lang="es"
                    setContents={noticia.fields.titular}
                    onBlur={(e) => setFormValue('titular', e.target.innerHTML)}
                    setOptions={{
                      buttonList: btnList2,
                    }}
                  />
                </FormGroup>
              </div>
            </Col>
          </Row>

          <Row className="m-0 px-1 pb-1 pt-0">
            <Col xs="12" className="m-0  p-0">
              <div ref={(div) => (ref_entradilla = div)}>
                <FormGroup
                  className={vacios.includes('entradilla') ? 'p-0 EditorEntradilla emptyField' : 'p-0 EditorEntradilla'}
                >
                  <Label for="exampleEmail">
                    Entradilla
                    {vacios.includes('entradilla') ? <span>*</span> : null}:
                  </Label>

                  <SunEditor
                    lang="es"
                    setContents={noticia.fields.entradilla}
                    onBlur={(e) => setFormValue('entradilla', e.target.innerHTML)}
                    setOptions={{
                      buttonList: btnList,
                    }}
                  />
                </FormGroup>
              </div>
            </Col>
          </Row>

          <Row className="m-0 px-1 pb-1 pt-0">
            <Col xs="12" className="m-0  p-0">
              <div ref={(div) => (ref_contenido_html = div)}>
                <FormGroup
                  className={
                    vacios.includes('contenido_html') ? 'p-0 EditorContenido emptyField' : 'p-0 EditorContenido'
                  }
                >
                  <Label for="exampleEmail">
                    Contenido
                    {vacios.includes('contenido_html') ? <span>*</span> : null}
                  </Label>
                  <SunEditor
                    setContents={noticia.fields.contenido_html}
                    onBlur={(e) => setFormValue('contenido_html', e.target.innerHTML)}
                    lang="es"
                    setOptions={{
                      buttonList: btnList,
                    }}
                  />
                </FormGroup>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </Fragment>
  );
};

export default EditorSunFormPage;
