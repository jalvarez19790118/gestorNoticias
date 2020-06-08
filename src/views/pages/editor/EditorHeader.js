import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Container, Col, Row } from 'reactstrap';
import { IconSave } from './config/select_config';
import { v4 as uuidv4 } from 'uuid';
import { useHistory, useParams } from 'react-router-dom';
import SavingCard from '../../commons/SavingCard';
import { FormContext } from '../../../context/FormContext';

const EditorHeader = ({ mode, storage, type }) => {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [status, setStatus] = useState({ status: '', msg: '' });
  const [verify, setVerify] = useState(false);

  const { vacios, verifyFields, saveNew, updateNew } = useContext(FormContext);

  const { id } = useParams();

  const saveElement = () => {
    let objNoticia = getStorageData();

    try {
      setStatus({ status: 'start', msg: `guardando ${type}...` });
      setShow(true);
      objNoticia.id = uuidv4();
      objNoticia.fields.id_act_not = objNoticia.fields.id;

      const respuesta = saveNew(type + 's', objNoticia);

      respuesta.then((data) => {
        if (data.status === 201) {
          let msg = `La ${type} se ha guardado correctamente`;
          sessionStorage.removeItem(storage);
          showErrorModal('ok', msg, 1500, true);
        } else {
          showErrorModal('fail', `Se ha producido un error ${data}`, 1500);
        }
      });
    } catch (error) {}
  };

  const updateElement = () => {
    let objNoticia = getStorageData();

    try {
      setStatus({ status: 'start', msg: `actualizando ${type}...` });
      setShow(true);

      objNoticia.id = id;
      objNoticia.fields.id_act_not = objNoticia.fields.id;

      const respuesta = updateNew(type + 's', objNoticia);

      respuesta.then((data) => {
        if (data.status === 200) {
          let msg = `La ${type} se ha modificado correctamente`;
          sessionStorage.removeItem(storage);
          showErrorModal('ok', msg, 1500, true);
        } else {
          showErrorModal('fail', `Se ha producido un error ${data}`, 1500);
        }
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (verify && vacios.length === 0) {
      if (mode === 'save') {
        saveElement();
      } else {
        updateElement();
      }
    }
  }, [vacios]);

  const showErrorModal = (status, msg, time, redi = false) => {
    setStatus({ status, msg });
    setShow(true);
    setTimeout(() => {
      setShow(false);
      if (redi) history.push(`/gestor/${type[0]}/${type}s`);
    }, time);
  };

  const getStorageData = () => {
    let objNoticia = sessionStorage.getItem(storage);

    if (objNoticia !== null) {
      objNoticia = JSON.parse(objNoticia);
    }

    return objNoticia;
  };

  const fieldsVerify = () => {
    try {
      let data = getStorageData();

      verifyFields(data);
      setVerify(true);
    } catch (error) {
      let msg = `Se ha producido un error: ${error} `;
      showErrorModal('fail', msg, 1500);
    }
  };

  const buttonComponent = () => {
    let texto = `Guardar ${type}`;
    if (mode !== 'save') texto = `Modificar ${type}`;

    return (
      <button onClick={(e) => fieldsVerify()} className="float-right">
        {IconSave}
        {texto}
      </button>
    );
  };

  return (
    <Fragment>
      <Container className="EditorHeader p-0" fluid={true}>
        <Row className="m-0 p-0">
          <Col sm="12" className="m-0 p-0">
            {buttonComponent()}
          </Col>
        </Row>
      </Container>
      <SavingCard show={show} status={status}></SavingCard>
    </Fragment>
  );
};

export default EditorHeader;
