import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';




const MyNoticiaCard = () => {
    return (

        <Card>
            <CardImg
                top
                width="100%"
                src="https://svadcf.es/documentos/banco_imagenes_noticias/vinetas/medicamentos.jpgnp"
                alt="Card image cap"/>
            <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the
                    bulk of the card's content.</CardText>
                <Button>Button</Button>
            </CardBody>
        </Card>
    );
}

export default MyNoticiaCard;