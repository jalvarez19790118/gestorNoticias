import React, { useEffect, Fragment } from 'react';
import { Container, Col, Row } from 'reactstrap';
import $ from 'jquery';
import EditorSunFormPage from './EditorSunFormPage';
import EditorFieldsFormPage from './EditorFieldsFormPage';

const EditorContentPanel = ({ type, noticia, setNoticia }) => {
  let ref = null;

  useEffect(() => {
    $(ref).fadeIn(300);
  }, []);

  return (
    <Fragment>
      <div ref={(div) => (ref = div)} style={{ display: 'block' }}>
        <Container fluid={true} className="EditNotPage m-0 p-0">
          <Row className="m-0 p-0 Editor_container">
            <Col sm="12" md="5" className="p-0 px-1 pr-0 pt-1 formFieldsPageContainer">
              <EditorFieldsFormPage type={type} noticia={noticia} setNoticia={setNoticia} />
            </Col>

            <Col sm="12" md="7" className="m-0 p-0 pr-1 pt-1 formPageContainer SunEditorFields ">
              <EditorSunFormPage type={type} noticia={noticia} setNoticia={setNoticia} />
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default EditorContentPanel;
