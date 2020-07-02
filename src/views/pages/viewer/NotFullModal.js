import React from 'react';
import {Modal,ModalBody} from 'reactstrap';





const NotFullModal = ({modal, showModal}) => {

    const {item, show} = modal;

    const toggle = () => showModal({
        ...modal,
        show: false
    });

    const styleObj = {
        'fontSize': '25px',
        'margin': '2px',
        'fontWeight': 'bold',
        'color': '#fff'
    };

 

    return (

        <div>

            <Modal isOpen={show} toggle={toggle} className="NotFullModal">
              <ModalBody>
           
              </ModalBody>

            </Modal>
        </div>

    );
}

export default NotFullModal;


