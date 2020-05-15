import React, {useEffect} from 'react';
import {Container, Col, Row} from 'reactstrap';
import $ from 'jquery';

import EditorFormPage from './EditorFormPage';


const EditorContentPanel = ({noticia,setNoticia}) => {


    let ref = null;

    useEffect(() => {

        $(ref).fadeIn(300);

    }, []);


    return (
      <div ref={div => ref = div} style={{'display': 'none'}}>
        <Container fluid={true}  className="EditNotPage m-0 p-0">
            <Row className="m-0 p-0">
                <Col sm='12' md='7' className="m-0 p-1">
                    <EditorFormPage noticia={noticia} setNoticia={setNoticia}/>

                </Col>


                <Col sm='12' md='5' className="m-0 p-1">

                   
                </Col>
                
            </Row>
        </Container>
        </div>
    );
}

export default EditorContentPanel;