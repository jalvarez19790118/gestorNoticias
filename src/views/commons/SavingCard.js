import React, { Fragment } from 'react';
import { Modal, ModalBody, Spinner } from 'reactstrap';
import MyIcon from '../../created/components/SidebarNav/components/MyIcon';

const StartComponent = ({ msg }) => {
  const Iconitem = (
    <MyIcon
      item={{
        class: 'fa-pulse',
        lib: 'Fa',
        name: 'FaSpinner',
        style: {
          fontSize: '20px',
          color: '#162c50',
          fontWeight: 'bold',
          marginRight: '5px',
          marginTop: '-5px',
        },
      }}
    />
  );

  return (
    <Fragment>
      <ModalBody className="StartComponent">
        {Iconitem}
        {msg}
      </ModalBody>
    </Fragment>
  );
};

const OkComponent = ({ msg }) => {
  const Iconitem = (
    <MyIcon
      item={{
        lib: 'Fa',
        name: 'FaCheck',
        style: {
          fontSize: '20px',
          color: '#3a7570',
          fontWeight: 'bold',
          marginRight: '5px',
          marginTop: '-5px',
        },
      }}
    />
  );

  return (
    <Fragment>
      <ModalBody className="OkComponent">
        {Iconitem}
        {msg}
      </ModalBody>
    </Fragment>
  );
};

const FailComponent = ({ msg }) => {
  const Iconitem = (
    <MyIcon
      item={{
        lib: 'Fa',
        name: 'FaTimes',
        style: {
          fontSize: '20px',
          color: '#800',
          marginRight: '5px',
          marginTop: '-5px',
        },
      }}
    />
  );

  return (
    <Fragment>
      <ModalBody className="FailComponent">
        {Iconitem}
        {msg}
      </ModalBody>
    </Fragment>
  );
};

const SavingCard = ({ show, status }) => {
  function returnStatusComponent({ status, msg }) {
    switch (status) {
      case 'start':
        return <StartComponent type="" msg={msg} />;
      case 'ok':
        return <OkComponent msg={msg} />;
      case 'fail':
        return <FailComponent msg={msg} />;

      default:
        return null;
    }
  }

  return (
    <Fragment>
      <Modal isOpen={show} className="SavingCard">
        {returnStatusComponent(status)}
      </Modal>
    </Fragment>
  );
};

export default SavingCard;
