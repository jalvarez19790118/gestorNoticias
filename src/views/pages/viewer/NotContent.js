import React from 'react';
import MyIcon from '../../../vibe/components/SidebarNav/components/MyIcon';
import {useHistory} from "react-router-dom";

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

const NotContent = ({mode, item, modal, showModal}) => {




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
    ] = dtf.formatToParts(d)

    const htmlEntities = new Html5Entities();
    
    const history = useHistory();


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
        name: 'FiXCircle',
        style: styleObj
    }}/>;

    const IconInfo = <MyIcon
        item={{
        lib: 'Feather',
        name: 'FiInfo',
        style: styleObj
    }}/>;

    const showModalWindow = () => {

        showModal({
            ...modal,
            item: item,
            show: true
        });
    }
    

    const navigateToEdit = () => {



        let site = mode.slice(0, -1);       
        history.push(`/gestor/editor/editar_${site}/${site}/${item.id}`);
      

    }

    return (

        <Card className="NotContent m-0 p-0">

            <CardHeader>
                <div className="float-left">
                    <Button onClick={e=>navigateToEdit()}>{IconEdit}</Button>
                    <Button>{IconCopy}</Button>
                    <Button>{IconDelete}</Button>
                </div>
                <div className="float-right">
                    <Button>{IconInfo}</Button>
                </div>

            </CardHeader>

            <CardBody onClick={showModalWindow}>
                <CardTitle className="m-0 p-0">
                    {htmlEntities.decode(item.fields.titular)}

                </CardTitle>

                <hr className="m-0 mt-0 p-0 pt-0"/>

                <CardSubtitle className="mt-2 d-flex">

                    <label className="mr-1">VADEMECUM</label>
                  

                </CardSubtitle>

                <CardText className="mt-2 mh_not">

                    {htmlEntities.decode(item.fields.entradilla)}

                    <br/><br/>

                    <span
                        dangerouslySetInnerHTML={{
                        __html: item.fields.contenido_html
                    }}/>

                </CardText>

            </CardBody>

        </Card>
    );
}

export default NotContent;