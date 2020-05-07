import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import MyNoticiasSlider from '../../elements/myelements/MyNoticiasSlider';

const MyInicioPage = () => {

    return (
        <Container fluid={true}>
         
          
            <Row>
                <Col sm='12'>

                    <MyNoticiasSlider name='2'/>

                </Col>
            </Row>

            <Row>
                <Col sm='12'>

                    <MyNoticiasSlider name='3'/>

                </Col>
            </Row>

            
            <Row>
                <Col sm='12'>

                    <MyNoticiasSlider name='4'/>

                </Col>
            </Row>
        </Container>
    );
}

export default MyInicioPage;