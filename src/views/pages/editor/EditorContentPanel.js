import React, { useEffect, useContext, Fragment, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import $ from 'jquery';

import EditorWysiwyqPage from './EditorWysiwyqPage';
import EditorFieldsFormPage from './EditorFieldsFormPage';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import MyIcon from '../../../created/components/SidebarNav/components/MyIcon';

import { v4 as uuidv4 } from 'uuid';
import { useHistory, useParams } from 'react-router-dom';
import SavingCard from '../../commons/SavingCard';
import { FormContext } from '../../../context/FormContext';
import { Toast } from 'react-bootstrap';

const EditorContentPanel = ({ type }) => {
  const mode = type.split('_')[1];
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState({ status: '', msg: '' });
  const { saveNew, updateNew, setNoticia, init_noticia, changeFields } = useContext(FormContext);
  const history = useHistory();
  const [showDelete, setShowDelete] = useState(false);

  const operation = type.split('_')[0];

  const clearElement = () => {
    setNoticia(init_noticia);
  };

  const saveElement = () => {
    if (operation === 'nueva') doSave();
    if (operation === 'editar') doUpdate();
  };

  const doSave = () => {
    if (Object.keys(changeFields).length === 0) {
      showErrorModal('fail', `Noticia sin datos`, 1500, true);
      return;
    }

    try {
      setStatus({ status: 'start', msg: `guardando ${type}...` });
      setShow(true);
      let cf = { ...changeFields };
      if (type === 'nueva_noticia') cf['type_not'] = 1;
      if (type === 'nueva_alerta') cf['type_not'] = 2;
      if (type === 'nueva_pactivo') cf['type_not'] = 3;

      const respuesta = saveNew(mode + 's', cf);

      respuesta.then((res) => {
        if (!res.data.success) {
          showErrorModal('fail', `Se ha producido un error: ${res.data.msg}`, 3500);
        } else {
          showErrorModal('ok', `La ${type} se ha guardado correctamente`, 1500, true);
        }
      });
    } catch (error) {
      showErrorModal('fail', `Se ha producido un error ${error}`, 1500);
    }
  };

  const doUpdate = () => {
    const id = parseInt(type.split('_')[2]);

    try {
      setStatus({ status: 'start', msg: `Actualizando ${type}...` });
      setShow(true);

      if (Object.keys(changeFields).length === 0) {
        showErrorModal('ok', `La ${type} se ha actualizado correctamente`, 1500, true);
        return;
      }

      const respuesta = updateNew(mode + 's', changeFields, id);

      respuesta.then((res) => {
        if (!res.data.success) {
          showErrorModal('fail', `Se ha producido un error: ${res.data.msg}`, 3500);
        } else {
          showErrorModal('ok', `La ${type} se ha actualizado correctamente`, 1500, true);
        }
      });
    } catch (error) {
      showErrorModal('fail', `Se ha producido un error ${error}`, 1500);
    }
  };

  const showErrorModal = (status, msg, time, redi = false) => {
    setStatus({ status, msg });
    setShow(true);
    setTimeout(() => {
      setShow(false);
      if (redi) history.push(`/gestor/${mode[0]}/${mode}s`);
    }, time);
  };

  let ref = null;

  useEffect(() => {
    setTimeout($(ref).fadeIn(300));
  }, []);

  const IconEraser = (
    <MyIcon
      item={{
        lib: 'Fa',
        name: 'FaEraser',
        style: {
          fontSize: '22px',
        },
      }}
    />
  );

  return (
    <Fragment>
      <div ref={(div) => (ref = div)} style={{ display: 'none' }}>
        <Fab onClick={saveElement} size="medium" id="AddNewButton" aria-label="add">
          <SaveIcon />
        </Fab>

        {/*<Fab size="medium" id="ClearButton" onClick={(e) => setShowDelete(true)} aria-label="add">
          {IconEraser}
        </Fab> */}
        <ToastDelete mode={mode} showDelete={showDelete} setShowDelete={setShowDelete} clearElement={clearElement} />

        <SavingCard show={show} status={status}></SavingCard>

        <Container fluid={true} className="EditNotPage m-0 p-0">
          <Row className="m-0 p-0 Editor_container">
            <Col sm="12" md="4" className="p-0 px-1 pr-0 pt-1 formFieldsPageContainer">
              <EditorFieldsFormPage type={type} />
            </Col>

            <Col sm="12" md="8" className="m-0 p-0 pr-1 pt-1 formPageContainer SunEditorFields ">
              <EditorWysiwyqPage type={type} />
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default EditorContentPanel;

const ToastDelete = ({ mode, showDelete, setShowDelete, clearElement }) => {
  return (
    <Toast
      show={showDelete}
      onClose={() => {
        setShowDelete(false);
      }}
      className="ToastDelete m-auto p-0"
      autohide
      delay={15000}
    >
      <Toast.Header>Limpiar {mode.replace('s', '')}</Toast.Header>

      <Toast.Body>
        <div className="m-0 p-0">¿Seguro que desea limpiar la {mode.replace('s', '')} ?</div>
        <div className="m-0 p-0 py-1">
          <button
            onClick={(e) => {
              e.preventDefault();

              setShowDelete(false);
            }}
            className="text-center m-0 mr-1 p-0"
          >
            No
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              clearElement();
              setShowDelete(false);
            }}
            className="text-center   m-0 mr-1 p-0"
          >
            Si
          </button>
        </div>
      </Toast.Body>
    </Toast>
  );
};
