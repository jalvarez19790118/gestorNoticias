import React, {Fragment} from 'react';

import {Card, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';

import {Html5Entities} from 'html-entities';

const FieldNot = ({name_field, value_field}) => {

  
    return (
        <Fragment>
            {value_field.length  <= 0
                ? <span className={"empty_field"}>{`{${name_field}}`}</span>
                : <span>{value_field}</span>}
        </Fragment>
    );
}

const NotContentFull = ({item}) => {

    let format_data = '';
    if (item.fields.fh_public != null) {
        const d = new Date(item.fields.fh_public);

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
        ] = dtf.formatToParts(d);

         format_data = `${da}-${mo}-${ye}`;

    }

    
    const comp_descr = item.fields.contenido_html != null ?  <span dangerouslySetInnerHTML={{__html: item.fields.contenido_html}}/> : <FieldNot name_field="Descripcion" value_field={''} />


    const htmlEntities = new Html5Entities();

    return (
        <Card className="NotContentFull m-0 p-0">

            <CardBody>
                <CardTitle className="m-0 p-0">
                    <FieldNot name_field="Titular" value_field={htmlEntities.decode(item.fields.titular)} />

                </CardTitle>

                <CardSubtitle className="mt-2 d-flex">

                    <label className="mr-1">VADEMECUM</label>
                    <label>
                        <FieldNot name_field="dd-mm-yyyy" value_field={format_data} />                    </label>

                </CardSubtitle>

                <CardText className="mt-2">


                    

                        <FieldNot name_field="Entradilla" value_field={htmlEntities.decode(item.fields.entradilla)} />
                    
                    <br/><br/>
                   
                      {comp_descr}    
                  
                

                </CardText>

            </CardBody>

        </Card>
    );
}

export default NotContentFull;