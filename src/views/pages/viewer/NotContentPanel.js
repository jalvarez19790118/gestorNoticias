import React, {useEffect, useState} from 'react';
import ScrollContainer from "react-indiana-drag-scroll";
import {Container, Row, Col} from 'reactstrap';
import NotContent from './NotContent';
import $ from 'jquery';
import NotFullModal from './NotFullModal';

const NotContentPanel = ({onpanel, items}) => {

    let ref = null;

    useEffect(() => {

        $(ref).fadeIn(300);

    }, []);

    const [modal,
        showModal] = useState({
        ...modal,
        show: false
    });

    const onPageVal = parseInt(12 / onpanel);

    return (

        <div ref={div => ref = div} style={{
            'display': 'none'
        }}>

            <NotFullModal modal={modal} showModal={showModal}></NotFullModal>

            <ScrollContainer
                style={{
                'maxHeight': 'calc(100vh - 90px)',
                'overflow': 'auto',
                'cursor': 'default'
            }}>
                <Container fluid={true} className="NotContentPanel">

                    <Row>
                        {items.map((item, idx) => {
                            return <Col sm={onPageVal} key={idx} className="m-0 p-1">
                                <NotContent item={item} modal={modal} showModal={showModal}></NotContent>
                            </Col>
                        })}

                    </Row>
                </Container>
            </ScrollContainer>

        </div>
    );
}

export default NotContentPanel;