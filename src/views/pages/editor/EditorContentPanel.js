import React, {useEffect} from 'react';
import {Container, Col, Row} from 'reactstrap';
import FormProvider from '../../../context/FormContext';
import $ from 'jquery';
import EditorSunFormPage from './EditorSunFormPage';
import EditorFieldsFormPage from './EditorFieldsFormPage';
import EditorFooter from './EditorFooter';



const EditorContentPanel = ({type,noticia,setNoticia}) => {


    let ref = null;
    let fieldForm = null;


    useEffect(() => {

        $(ref).fadeIn(300);

    }, []);


    return (
    <FormProvider>
      <div ref={div => ref = div} style={{'display': 'block'}}>
        <Container fluid={true}  className="EditNotPage m-0 p-0">
            <Row className="m-0 p-0 Editor_container">
                <Col sm='12' md='5' className="py-1 pl-1 pr-0 formFieldsPageContainer">
                    <EditorFieldsFormPage type={type} noticia={noticia} setNoticia={setNoticia}/>

                </Col>


                <Col sm='12' md='7' className="m-0 p-1 formPageContainer">
                 <EditorSunFormPage  type={type} noticia={noticia} setNoticia={setNoticia}/>

                   
                </Col>
                
            </Row>
        </Container>
        </div>
        <EditorFooter/>
        </FormProvider>
    );
}

export default EditorContentPanel;