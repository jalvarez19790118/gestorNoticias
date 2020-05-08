import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import NotContent from './NotContent';

import ScrollContainer from "react-indiana-drag-scroll";

const NotContentPanel = ({items}) => {
    return (

        
        <ScrollContainer
        style={{
        'maxHeight': 'calc(100vh - 90px)',
        'overflow': 'auto',
        'cursor': 'default'
    }}>
        <Container fluid={true} className="NotContentPanel">
            <Row>
                {items.map((item, idx) => {
                    return <Col sm="12" md="6"  lg="4" xl="3"  key={idx} className="m-0 p-1">
                       <NotContent item={item}></NotContent>
                    </Col>
                })}

            </Row>
        </Container>
        </ScrollContainer>
    );
}

export default NotContentPanel;