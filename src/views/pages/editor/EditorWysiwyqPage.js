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

  const { noticia,vacios,verifyFields } = useContext(FormContext);

  const [titular, setTitular] = useState(noticia.fields.titular);
  const [entradilla, setEntradilla] = useState(noticia.fields.entradilla);
  const [contenidoHtml, setContenidoHtml] = useState(noticia.fields.contenido_html);

  const { wheight } = useContext(MyContext);


  
  useEffect(() => {


   

    let new_size =  $('#ref_titular').height() +  $('#ref_entradilla').height();
   new_size = wheight - (new_size + 120); 
  
 


   $('#ref_contenido .jodit_container').css({ 'min-height': `${new_size}`,  'height': `${new_size}`  });

  });


  const saveState = (new_noticia) => {
   
   sessionStorage.setItem(type, JSON.stringify(new_noticia));
  
  };

  const setFormValue = (field, value) => {
    let new_noticia = {
      ...noticia,
    };
    new_noticia.fields[field] = value;
    saveState(new_noticia);
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
    height: 165,
    minHeight: 165,
    allowResizeX: false,
    allowResizeY: true,
  };



  

  useEffect(() => {

    setFormValue('titular',titular);

  }, [titular]);

  useEffect(() => {
    setFormValue('entradilla',entradilla);
  }, [entradilla]);


  useEffect(() => {
    setFormValue('contenido_html', contenidoHtml);
  }, [contenidoHtml]);




  useEffect(() => {
  
    setTitular(noticia.fields.titular);
    setEntradilla(noticia.fields.entradilla);
    setContenidoHtml(noticia.fields.contenido_html);
  
  }, [noticia])
 

  return (
    <Fragment>
      <Container fuid="true" className="EditorFormPage m-0 p-0">
        <Form>
          <Row className="m-0 px-1 pb-1 pt-0">
            <Col sm="12" className="m-0 p-0 py-0">
              <div id="ref_titular" className ={vacios.includes('titular') ? 'isEmpty' : null } ref={ref_titular}>
                <FormGroup className={'p-0 EditorTitular'}>
                  <Label for="exampleEmail">Titular:</Label>
                </FormGroup>

                <JoditEditor
                  value={titular}
                  config={config}
                  tabIndex={1} 
                
                  onBlur={(newContent) => {
                    
                    setTitular(newContent);
                   
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className="m-0 px-1 pb-1 pt-0">
            <Col sm="12" className="m-0 p-0 py-0">
              <div id="ref_entradilla"  className ={vacios.includes('entradilla') ? 'isEmpty' : null } ref={ref_entradilla}>
                <FormGroup className={'p-0 EditorTitular'}>
                  <Label for="exampleEmail">Entradilla:</Label>
                </FormGroup>

                <JoditEditor
                  value={entradilla}
                  config={config}
                
                  tabIndex={1} 
                  onBlur={(newContent) => {
                  
                    setEntradilla(newContent);
                  }}
                />
              </div>
            </Col>
          </Row>

          <Row className="m-0 px-1 pb-1 pt-0">
            <Col sm="12" className="m-0 p-0 py-0">
              <div id="ref_contenido"  className ={vacios.includes('contenido_html') ? 'isEmpty' : null } ref={ref_contenido}>
                <FormGroup className={'p-0 EditorTitular'}>
                  <Label for="exampleEmail">Contenido:</Label>
                </FormGroup>

                <JoditEditor
                  ref={ref_titular}
                  value={contenidoHtml}
                  config={config}
                 
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) => {
                   
                    setContenidoHtml(newContent)
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
