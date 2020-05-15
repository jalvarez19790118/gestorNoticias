import React from 'react';

import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col,
    Spinner 
} from 'reactstrap';

const LoadingCard = () => {
    return (

        <Container className="LoadingCard m-0 p-0">
            <Row>

                <Col>
                    <Card className="m-0 p-0">

                        <CardBody>
                            <CardTitle>

                            <Spinner  style={{ width: '3rem', height: '3rem' }}  />
                            </CardTitle>

                            <CardText className="mt-2">
                                Cargando...
                            </CardText>

                        </CardBody>

                    </Card>

                </Col>
            </Row>
        </Container>

    );
}

export default LoadingCard;