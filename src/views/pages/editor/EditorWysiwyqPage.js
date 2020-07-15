import React, { Fragment, useState, useRef, useContext, useEffect } from 'react';
import { Container, Col, Row, Form, FormGroup, Label } from 'reactstrap';
import JoditEditor from 'jodit-react';
import { FormContext } from '../../../context/FormContext';

const EditorWysiwyqPage = ({ type }) => {
  const ref_titular = useRef(null);
  const ref_entradilla = useRef(null);
  const ref_contenido = useRef(null);

  const { noticia, setNoticia, changeFields, setChangefields } = useContext(FormContext);

  const saveState = (new_noticia) => {
    sessionStorage.setItem(type, JSON.stringify(new_noticia));
  };

  const setFormValue = (field, value) => {
    let new_noticia = {
      ...noticia,
    };

    new_noticia[field] = value;

    let cf = { ...changeFields };

    cf[field] = value;

    setChangefields(cf);

    setNoticia(new_noticia);
  };

  const buttons1 =
    'source,|,bold,strikethrough,underline,italic,superscript,subscript,|,eraser,|,ul,ol,|,outdent,indent,align,|,font,fontsize,brush,paragraph,|,image,video,table,link,|,undo,redo,|,selectall,cut,copy,paste,copyformat,|,hr,|,fullsize';



  const config = {
    uploader: {
      insertImageAsBase64URI: true,
    },

    controls: {
      font: { list: { Calibri: 'Calibri' } },
    },
    style: {
      fontFamily: 'Calibri',
      fontSize: '12px',
    },
    toolbarAdaptive:false,
    width: '100%',
    minHeight: '200px',
    enter: 'div',
    language: 'es',
    buttons: buttons1,
    toolbarButtonSize: 'small',
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
  };


  
  const config_0= {
    uploader: {
      insertImageAsBase64URI: true,
    },

    toolbar: true,
    spellcheck: false,
    controls: {
      font: { list: { Calibri: 'Calibri' } },
    },
    style: {
      fontFamily: 'Calibri',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#162c50'
    },
    toolbarAdaptive:false,
    width: '100%',
    enter: 'div',
    language: 'es',
    minHeight: '150px',
    buttons: "superscript,subscript",
    toolbarButtonSize: 'small',
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
  };


  const config_1= {
    uploader: {
      insertImageAsBase64URI: true,
    },

    toolbar: true,
    spellcheck: false,
    controls: {
      font: { list: { Calibri: 'Calibri' } },
    },
    style: {
      fontFamily: 'Calibri',
      fontSize: '16px',
      fontStyle: 'italic',
      color: '#666'
    },
    toolbarAdaptive:false,
    width: '100%',
    enter: 'div',
    language: 'es',
    minHeight: '150px',
    buttons: "superscript,subscript",
    toolbarButtonSize: 'small',
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
  };


  let config_2 = { ...config };
  config_2['minHeight'] = '390px';

  return (
    <Fragment>
      <Container fluid className="EditorFormPage m-0 p-0">
        <Form>
          <Row className="m-0 px-1 pb-1 pt-0">
            <Col sm="12" className="m-0 p-0 py-0">
              <div id="ref_titular" ref={ref_titular}>
                <FormGroup className={'p-0 EditorTitular'}>
                  <Label for="exampleEmail">Titular:</Label>
                </FormGroup>

                <JoditEditor
                  value={noticia.titular}
                  config={config_0}
                  tabIndex={1}
                  onBlur={(newContent) => {
                    setFormValue('titular', newContent);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className="m-0 px-1 pb-1 pt-0">
            <Col sm="12" className="m-0 p-0 py-0">
              <div id="ref_entradilla" ref={ref_entradilla}>
                <FormGroup className={'p-0 EditorTitular'}>
                  <Label for="exampleEmail">Entradilla:</Label>
                </FormGroup>

                <JoditEditor
                  value={noticia.entradilla}
                  config={config_1}
                  tabIndex={1}
                  onBlur={(newContent) => {
                    setFormValue('entradilla', newContent);
                  }}
                />
              </div>
            </Col>
          </Row>

          <Row className="m-0 px-1 pb-1 pt-0">
            <Col sm="12" className="m-0 p-0 py-0">
              <div id="ref_contenido" ref={ref_contenido}>
                <FormGroup className={'p-0 EditorTitular'}>
                  <Label for="exampleEmail">Contenido:</Label>
                </FormGroup>

                <JoditEditor
                  ref={ref_titular}
                  value={noticia.contenido_html}
                  config={config_2}
                  tabIndex={1} // tabIndex of textarea
                  onBlurPassive={(e) => {}}
                  onBlur={(newContent) => {
                    setFormValue('contenido_html', newContent);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </Fragment>
  );
};

export default EditorWysiwyqPage;
