import React, {useState, useContext, useEffect} from 'react';
import {Html5Entities} from 'html-entities';
import {
    Container,
    Row,
    Col,

    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle

} from 'reactstrap';

import {MyContext} from '../../../context/MyContext';

import MyNoticiasSlider from '../../elements/myelements/MyNoticiasSlider';

const MyInicioPage = () => {

    const {noticias} = useContext(MyContext);

    const [items,
        setItems] = useState([]);

    const [elSel,
        setSelected] = useState(null);

    const filterNews = (tipo, data) => {

        if (tipo === 'noticias') 
            setItems(data.slice(0, size));
        setSelected(data[0]);
    }

    const [size,
        setSize] = useState(1);

    const changeNewSize = e => {

        setSize(e.target.value);
    }

    useEffect(() => {

        if (noticias.length > 0) {
            filterNews('noticias', noticias);

        }

    }, [noticias, size]);

    const htmlEntities = new Html5Entities();

    return (
        <Container fluid={true} className="m-0 p-0">

            <Row className="m-0 p-0">
                <Col sm='12' md='4' lg='6' className="m-0 p-1">
                    <Row className="m-0 p-0">

                        <Col xs="8" className="m-0 p-0"></Col>

                        <Col xs="4" className="m-0 p-0">
                            <Form>
                                <FormGroup >
                                    <Label>Tamaño</Label>
                                    <Input
                                        onChange={changeNewSize}
                                        value={size}
                                        type="select"
                                        name="size"
                                        id="exampleSelect">
                                        <option>1</option>
                                        <option>5</option>
                                        <option>10</option>
                                        <option>15</option>
                                        <option>20</option>
                                        <option>25</option>
                                        <option>50</option>
                                        <option>100</option>
                                    </Input>
                                </FormGroup>

                            </Form>

                        </Col>

                    </Row>

                    <Row className="m-0 p-0">

                        <Col sm='12' className="m-0 p-0">
                            <MyNoticiasSlider
                                setSelected={setSelected}
                                items={items}
                                name='2'
                                className="m-0 p-0"/>
                        </Col>

                    </Row>

                </Col>

                <Col sm='12' md='8' lg='6' className="m-0 p-1">

                    {(elSel !== null)
                        ? <div>

                                <Card className="p-2">
                                    <CardBody>
                                        <CardTitle>
                                            {htmlEntities.decode(elSel.titular)}

                                        </CardTitle>

                                        <hr/>
                                        <CardText>

                                            {htmlEntities.decode(elSel.entradilla)}

                                        </CardText>
                                        
                                        
                                            <Container fluid={true} dangerouslySetInnerHTML={{__html: elSel.contenido_html}} />

                                       
                                    </CardBody>
                                </Card>

                            </div>
                        : null}

                </Col>
            </Row>

        </Container>
    );
}

export default MyInicioPage;