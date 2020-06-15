import React, { useState, Fragment } from 'react';
import MyIcon from '../../../created/components/SidebarNav/components/MyIcon';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import { Button, Card, CardHeader, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Toast } from 'react-bootstrap';

const NotContent = ({ mode, item, modal, showModal, deleteElement, cloneElement }) => {
  
 let d = new Date(item.fields.fh_public);

  let dtf = new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
   
   hour12: false,
  
  });





 let [{ value: mo }, , { value: da }, , { value: ye },,{value:ho},,{value:mi}] = dtf.formatToParts(d);
  let format_data = `${da}-${mo}-${ye} ${ho}:${mi}`;


  const history = useHistory();

  const styleObj = {
    fontSize: '20px',
    margin: '2px',
  };

  const IconView = (
    <MyIcon
      item={{
        lib: 'Feather',
        name: 'FiEye',
        style: styleObj,
      }}
    />
  );

  const IconEdit = (
    <MyIcon
      item={{
        lib: 'Feather',
        name: 'FiEdit',
        style: styleObj,
      }}
    />
  );

  const IconCopy = (
    <MyIcon
      item={{
        lib: 'Feather',
        name: 'FiCopy',
        style: styleObj,
      }}
    />
  );

  const IconDelete = (
    <MyIcon
      item={{
        lib: 'Feather',
        name: 'FiXCircle',
        style: styleObj,
      }}
    />
  );

  const IconInfo = (
    <MyIcon
      item={{
        lib: 'Feather',
        name: 'FiInfo',
        style: styleObj,
      }}
    />
  );

  const showModalWindow = () => {
    if (!showDelete && !showClone) {
      showModal({
        ...modal,
        item: item,
        show: true,
      });
    }
  };

  const navigateToEdit = () => {
    let site = mode.slice(0, -1);
    history.push(`/gestor/editor/editar_${site}/${site}/${item.id}`);
  };

  const [showDelete, setShowDelete] = useState(false);
  const [showClone, setShowClone] = useState(false);

  return (
    <Card className="NotContent m-0 p-0">
      <CardHeader>
        <div className="float-left">
          <Button onClick={(e) => navigateToEdit()}>{IconEdit}</Button>
          <Button
            onClick={(e) => {
              if (!showDelete) { 

                $('#' + mode + "_" + item.id + ' .card').css({'border' : '2px solid #0f6086'});
                setShowClone(true); 
                }
            }}
          >
            {IconCopy}
          </Button>
          <Button
            onClick={(e) => {
              if (!showClone)  { 
                $('#' + mode + "_" + item.id + ' .card').css({'border' : '2px solid #800'});
                setShowDelete(true); 
              }
            }}
          >
            {IconDelete}
          </Button>
        </div>
        <div className="float-right">
          <Button>{IconInfo}</Button>
        </div>
      </CardHeader>

      <CardBody onClick={showModalWindow}>
        <ToastDelete
          mode={mode}
          id={item.id}
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          deleteElement={deleteElement}
        />

        <ToastClone
          mode={mode}
          item={item}
          showClone={showClone}
          setShowClone={setShowClone}
          cloneElement={cloneElement}
        />

        <CardTitle className="m-0 p-0">
          <p
            dangerouslySetInnerHTML={{
              __html: item.fields.titular,
            }}
          />
        </CardTitle>

        <hr className="m-0 mt-0 p-0 pt-0" />

        <CardSubtitle className="mt-2 d-flex">
          <label className="mr-1">VADEMECUM - {format_data} </label>
        </CardSubtitle>

        <CardText className="mt-2 mh_not">
          <p
            dangerouslySetInnerHTML={{
              __html: item.fields.entradilla,
            }}
          />

          <p
            dangerouslySetInnerHTML={{
              __html: item.fields.contenido_html,
            }}
          />
        </CardText>
      </CardBody>
    </Card>
  );
};

export default NotContent;

const ToastDelete = ({ mode, id, showDelete, setShowDelete, deleteElement }) => {
  const IconLoad = (
    <MyIcon
      item={{
        class: 'fa-pulse',
        lib: 'Fa',
        name: 'FaSpinner',
        style: {
          fontSize: '16px',
          color: '#800',
          marginRight: '5px',
        },
      }}
    />
  );

  const [removing, setRemoving] = useState(false);
  const [errorRemoving, setErrorRemoving] = useState(false);

  return (
    <Toast
      show={showDelete}
      onClose={() => {  $('#' + mode + "_" + id + ' .card').css({'border' : '1px solid #aaa'});  setRemoving(false); setErrorRemoving(false); setShowDelete(false)}}
      className="ToastDelete m-auto p-0"
      autohide
      delay={5000}
    >
      <Toast.Header>Eliminar {mode.replace('s', '')}</Toast.Header>

      {!removing ? (
        <Toast.Body>
          <div className="m-0 p-0">¿Seguro que desea eliminar la {mode.replace('s', '')} ?</div>
          <div className="m-0 p-0 py-1">
            <button
              onClick={(e) => {
                e.preventDefault();
                $('#' + mode + "_" + id + ' .card').css({'border' : '1px solid #aaa'});
                setShowDelete(false);
              }}
              className="text-center m-0 mr-1 p-0"
            >
              No
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setRemoving(true);
                deleteElement(id,setErrorRemoving);
              }}
              className="text-center   m-0 mr-1 p-0"
            >
              Si
            </button>
          </div>
        </Toast.Body>
      ) : (
        <Toast.Body>

        <div className="m-1 p-1">
          {!errorRemoving ? 
            <Fragment> {IconLoad}Eliminado {mode.replace('s', '')} ...</Fragment>

            : 
            <Fragment>Se ha producido un error</Fragment>
          }
          </div>
          
        </Toast.Body>
      )}
    </Toast>
  );
};

const ToastClone = ({ mode, item, showClone, setShowClone, cloneElement }) => {
  const [cloning, setCloning] = useState(false);
  const [errorCloning, setErrorCloning] = useState(false);

  const IconLoad = (
    <MyIcon
      item={{
        class: 'fa-pulse',
        lib: 'Fa',
        name: 'FaSpinner',
        style: {
          fontSize: '16px',
          color: '#0f6086',
          marginRight: '5px',
        },
      }}
    />
  );

  return (
    <Toast
      show={showClone}
      onClose={() =>{  $('#' + mode + "_" + item.id + ' .card').css({'border' : '1px solid #aaa'}); setErrorCloning(false); setCloning(false);setShowClone(false); }}
      className="ToastClone m-auto p-0"
      autohide
      delay={5000}
    >
      <Toast.Header>Duplicar {mode.replace('s', '')}</Toast.Header>

      {!cloning ? (
        <Toast.Body>
          <div className="m-0 p-0">¿Seguro que desea duplicar la {mode.replace('s', '')} ?</div>
          <div className="m-0 p-0 py-1">
            <button
              onClick={(e) => {
                e.preventDefault();
                $('#' + mode + "_" + item.id + ' .card').css({'border' : '1px solid #aaa'});
                setShowClone(false);
              }}
              className="text-center m-0 mr-1 p-0"
            >
              No
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setCloning(true);
                cloneElement(item, setShowClone,setCloning,setErrorCloning);
              }}
              className="text-center   m-0 mr-1 p-0"
            >
              Si
            </button>
          </div>
        </Toast.Body>
      ) : (
        <Toast.Body>
          <div className="m-1 p-1">
          {!errorCloning ? 
            <Fragment>{IconLoad}Duplicando {mode.replace('s', '')} ...</Fragment>

            : 
            <Fragment>Se ha producido un error</Fragment>
          }
          </div>
        </Toast.Body>
      )}
    </Toast>
  );
};
