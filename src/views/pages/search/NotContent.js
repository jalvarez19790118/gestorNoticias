import React, {useEffect} from 'react';
import MyIcon from '../../../vibe/components/SidebarNav/components/MyIcon';

import {
    Card,
    CardHeader,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';

import {Html5Entities} from 'html-entities';

const NotContent = ({item, modal, showModal}) => {

    
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

    const styleObj = {
        'fontSize': '20px',
        'margin': '2px'
    };

    const IconView = <MyIcon
        item={{
        lib: 'Feather',
        name: 'FiEye',
        style: styleObj
    }}/>;

    const IconEdit = <MyIcon
        item={{
        lib: 'Feather',
        name: 'FiEdit',
        style: styleObj
    }}/>;

    const IconCopy = <MyIcon
        item={{
        lib: 'Feather',
        name: 'FiCopy',
        style: styleObj
    }}/>;

    const IconDelete = <MyIcon
        item={{
        lib: 'Feather',
        name: 'FiXSquare',
        style: styleObj
    }}/>;




    const showModalWindow = () => {

        showModal({
            ...modal,
          item: item,
          show: true
        });
    }

    return (

        <Card onClick={showModalWindow} className="NotContent m-0 p-0">

            <CardHeader>
                <div className="float-left">
                    <Button>{IconEdit}</Button>
                    <Button>{IconCopy}</Button>
                   
                </div>
                <div className="float-right">
                  <Button>{IconDelete}</Button>
                </div>

            </CardHeader>

            <CardBody>
                <CardTitle className="m-0 p-0">
                    {htmlEntities.decode(item.titular)}

                </CardTitle>

                <hr className="m-0 mt-0 p-0 pt-0"/>

                <CardSubtitle className="mt-2 d-flex">

                    <label className="mr-1">VADEMECUM</label>
                    <label>{`${da}-${mo}-${ye}`}</label>

                </CardSubtitle>

                <CardText className="mt-2">

                
                    {htmlEntities.decode(item.entradilla)}
               

                </CardText>

            </CardBody>

        </Card>
    );
}

export default NotContent;