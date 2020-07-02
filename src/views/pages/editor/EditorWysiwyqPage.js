import React, { Fragment, useState, useRef, useContext, useEffect } from 'react';
import { Container, Col, Row, Form, FormGroup, Label } from 'reactstrap';
import JoditEditor from 'jodit-react';
import { FormContext } from '../../../context/FormContext';
import { MyContext } from '../../../context/MyContext';
import $ from 'jquery';

const EditorWysiwyqPage = ({ type }) => {
  const ref_titular = useRef(null);
  const ref_entradilla = useRef(null);
  const ref_contenido = useRef(null);

  const { noticia, setNoticia, vacios, verifyField,  changeFields, setChangefields } = useContext(FormContext);

  //const [titular, setTitular] = useState(noticia.titular);
  //const [entradilla, setEntradilla] = useState(noticia.entradilla);
  //const [contenidoHtml, setContenidoHtml] = useState(noticia.contenido_html);

  const { wheight } = useContext(MyContext);

  useEffect(() => {
    //let new_size = $('#ref_titular').height() + $('#ref_entradilla').height();
    //new_size = wheight - (new_size + 120);
    // $('#ref_contenido .jodit_container').css({ 'min-height': `${new_size}`,  'height': `${new_size}`  });
  });

  const saveState = (new_noticia) => {
    sessionStorage.setItem(type, JSON.stringify(new_noticia));
  };

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

  const buttons1 =
    'source,|,bold,strikethrough,underline,italic,superscript,subscript,|,eraser,|,ul,ol,|,outdent,indent,align,|,font,fontsize,brush,paragraph,|,image,video,table,link,|,undo,redo,|,selectall,cut,copy,paste,copyformat,|,hr,|,fullsize';

  
    const config = {
    readonly: false,
    language: 'es',
    uploader: {
      insertImageAsBase64URI: true,
    },
    buttons: buttons1,
    toolbarButtonSize: 'small',
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
  
    allowResizeX: false,
    allowResizeY: true,
  };
/*
  useEffect(() => {
    setFormValue('titular', titular);
  }, [titular]);

  useEffect(() => {
    setFormValue('entradilla', entradilla);
  }, [entradilla]);

  useEffect(() => {
    setFormValue('contenido_html', contenidoHtml);
  }, [contenidoHtml]);

  useEffect(() => {
    setTitular(noticia.titular);
    setEntradilla(noticia.entradilla);
    setContenidoHtml(noticia.contenido_html);
  }, [noticia]);

  */
  return (
    <Fragment>
      <Container  className="EditorFormPage m-0 p-0">
        <Form>
          <Row className="m-0 px-1 pb-1 pt-0">
            <Col sm="12" className="m-0 p-0 py-0">
              <div id="ref_titular" ref={ref_titular}>
                <FormGroup className={'p-0 EditorTitular'}>
                  <Label for="exampleEmail">Titular:</Label>
                </FormGroup>

                <JoditEditor
                  value={noticia.titular}
                  config={config}
                  tabIndex={1}
                  onBlur={(newContent) => {
                
                   setFormValue('titular',newContent);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className="m-0 px-1 pb-1 pt-0">
            <Col sm="12" className="m-0 p-0 py-0">
              <div
                id="ref_entradilla"
               
                ref={ref_entradilla}
              >
                <FormGroup className={'p-0 EditorTitular'}>
                  <Label for="exampleEmail">Entradilla:</Label>
                </FormGroup>

                <JoditEditor
                  value={noticia.entradilla}
                  config={config}
                  tabIndex={1}
                  onBlur={(newContent) => {
                    
                    setFormValue('entradilla',newContent);
                  }}
                />
              </div>
            </Col>
          </Row>

          <Row className="m-0 px-1 pb-1 pt-0">
            <Col sm="12" className="m-0 p-0 py-0">
              <div
                id="ref_contenido"
               
                ref={ref_contenido}
              >
                <FormGroup className={'p-0 EditorTitular'}>
                  <Label for="exampleEmail">Contenido:</Label>
                </FormGroup>

                <JoditEditor
                  ref={ref_titular}
                  value={noticia.contenido_html}
                  config={config}
                  tabIndex={1} // tabIndex of textarea
                  onBlurPassive ={(e)=>{}}
                  onBlur={(newContent) => {
                    setFormValue('contenido_html',newContent);
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
