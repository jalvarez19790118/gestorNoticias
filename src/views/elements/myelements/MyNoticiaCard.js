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

import {Html5Entities} from 'html-entities';

const MyNoticiaCard = ({item}) => {

    const htmlEntities = new Html5Entities();

    return (

        <Card className="p-2">
            <CardBody>
                <CardTitle>
                {htmlEntities.decode(item.titular)} 
                 
                </CardTitle>

                <hr/>
                <CardText>
                
                 {htmlEntities.decode(item.entradilla)}
                 
                 
             
                
                </CardText>

            </CardBody>
        </Card>

    );
}

export default MyNoticiaCard;