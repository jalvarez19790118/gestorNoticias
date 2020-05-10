import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import ScrollContainer from "react-indiana-drag-scroll";
import NotContentFull from './NolContentFull';
import MyIcon from '../../../vibe/components/SidebarNav/components/MyIcon';

const NotFullModal = ({modal, showModal}) => {

    const {item, show} = modal;

    const toggle = () => showModal({
        ...modal,
        show: false
    });



    const styleObj = {
        'fontSize': '20px',
        'margin': '2px',
        'color' : '#162c50'
    };

    const IconClose = <MyIcon
    item={{
    lib: 'Feather',
    name: 'FiXSquare',
    style: styleObj
}}/>;



    return (

        <div>

            <Modal isOpen={show} toggle={toggle} className="NotFullModal">
                <ModalHeader className="m-0 p-1">

               

                <div className="float-right">
                  <Button onClick={toggle}>{IconClose}</Button>
                </div>

                </ModalHeader>

                <ModalBody className="m-0 p-0">

                    <ScrollContainer
                        style={{
                        'maxHeight': 'calc(100vh - 5px)',
                        'overflow': 'auto',
                        'cursor': 'default'
                    }}>
                        <NotContentFull item={item}/>

                    </ScrollContainer>

                </ModalBody>

            </Modal>
        </div>

    );
}

export default NotFullModal;
