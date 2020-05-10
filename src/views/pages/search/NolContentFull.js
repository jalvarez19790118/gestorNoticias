import React from 'react';

import {
    Card,
    CardHeader,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';

import {Html5Entities} from 'html-entities';

const ContentFull = ({item}) => {

    

    const d = new Date(item.fh_public)
    const dtf = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
    const [
        {
            value : mo
        },, {
            value : da
        },, {
            value : ye
        }
    ] = dtf.formatToParts(d)

    const htmlEntities = new Html5Entities();




    return (
        <Card className="NotContent m-0 p-0">

            <CardBody>
                <CardTitle className="m-0 p-0">
                    {htmlEntities.decode(item.titular)}

                </CardTitle>

                <CardSubtitle className="mt-2 d-flex">

                    <label className="mr-1">VADEMECUM</label>
                    <label>{`${da}-${mo}-${ye}`}</label>

                </CardSubtitle>

                <CardText className="mt-2">

                    {htmlEntities.decode(item.entradilla)}

                    <br/>

                    <span
                        dangerouslySetInnerHTML={{
                        __html: item.contenido_html
                    }}/>

                </CardText>

            </CardBody>

        </Card>
    );
}

export default ContentFull;