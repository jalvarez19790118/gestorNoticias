import React, { useEffect, useState, useContext } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Container, Row, Col } from 'reactstrap';
import MiniNotContent from './MiniNotContent';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import { makeStyles } from '@material-ui/core/styles';
import { FormContext } from '../../../context/FormContext';
import { MyContext } from '../../../context/MyContext';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '@material-ui/core/Modal';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { GAppContext } from '../../../context/GAppContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  sopt: {
    display: 'none',
    ['@media (max-width:973px)']: {
      display: 'block',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    borderRadius: '0.25rem',
    border: '1px solid #162c50',
    display: 'flex',
    flexFlow: 'column',
    height: '200px',
    padding: '4px',
    width: '100%',
    maxWidth: '250px',
  },

  cardContent: {
    cursor: 'pointer',
    padding: '4px',
  },

  cardActions: {
    padding: '0px',
    margin: '0px',
    borderBottom: '1px solid #aaa',
    background: '#162c50',
    borderRadius: '0.25rem',
    display: 'flex',

    '& svg': {
      fill: '#fff',
      fontSize: '20px',
    },

    '& label': {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '14px',
      width: 'calc(100% - 25px)',
      margin: '8px',
      float: 'left',
    },
  },
  modalClose: {
    width: '25px',
    float: 'right',

    '& button': {
      float: 'right',
      background: '#162c50',
      margin: '0px',
      padding: '4px',
    },
  },

  searchLabel: {
    fontWeight: 'bold',
    fontSize: '13px',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#162c50',
    height: '30px',
    lineHeight: '30px',
    marginLeft: '0px',
    marginRight: '10px',
    float: 'left',
  },

  dateInput: {
    width: '160px',
    float: 'right',

    '& input': {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#162c50',
    },
  },

  inputPage: {
    width: '65px',

    '& input': {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#162c50',
    },
  },

  button: {
    textTransform: 'unset',
    boxShadow: 'unset',
    background: '#162c50 !important',
    color: '#fff !important',
    borderRadius: '0.35rem !important',
    position: 'relative',
    padding: '8px',
    marginBottom: 'auto',

    '&:hover': {
      textTransform: 'unset',
      boxShadow: 'unset',
      background: '#162c50',
      color: '#fff',
    },
  },
}));

const NotContentPanel = ({ mode, onpanel, setLoadingNews }) => {
  const classes = useStyles();
  let ref = null;
  const history = useHistory();
  const { currentDate, news, setNews, obtieneNoticias } = useContext(MyContext);
  const { setNoticia, deleteNew, saveNew } = useContext(FormContext);
  const [openModalSearchOpt, setOpenModalSearchOpt] = useState(false);

  const createNewNot = () => {
    setNoticia(null);
    history.push(`/gestor/editor/nueva_${mode.replace('s', '')}/${mode.replace('s', '')}`);
  };

  const [open, setOpen] = useState(false);

  const onPageVal = parseInt(12 / onpanel);

  const deleteElement = (id, setErrorRemoving) => {
    try {
      const respuesta = deleteNew(mode, id);

      respuesta.then((res) => {
        if (res.data.success !== undefined && res.data.success) {
          $('#' + mode + '_' + id).fadeOut(() => {
            setNews(news.filter((v, k) => v.id !== id));
          });
        } else {
          setErrorRemoving(true);
        }
      });
    } catch (error) {
      setErrorRemoving(true);
      console.log(error);
    }
  };

  const cloneElement = (item, setShowClone, setCloning, setErrorCloning) => {
    try {
      delete item['id'];
      delete item['id_old'];
      delete item['imagen_noticia'];
      delete item['desc_categoria'];

      if (item['fh_desactivacion'] == '') item['fh_desactivacion'] = null;
      if (item['fh_portada'] == '') item['fh_portada'] = null;

      item['titular'] = item['titular'] + ' - (Copia)';

      const respuesta = saveNew(mode, item);

      respuesta.then((res) => {
        if (res.data.success !== undefined && res.data.success) {
          let date_selected = sessionStorage.getItem('selec_date');
          obtieneNoticias(mode, date_selected).then(() => {
            setShowClone(false);
            setCloning(false);
          });
        } else {
          setErrorCloning(true);
        }
      });
    } catch (error) {
      setErrorCloning(true);
    }
  };

  const searchOptions = () => {
    setOpenModalSearchOpt(true);
  };

  return (
    <div>
      <Fab size="medium" onClick={createNewNot} id="AddNewButton" aria-label="add">
        <AddIcon />
      </Fab>

      <Fab size="medium" onClick={searchOptions} id="SearchOptionButton" className={classes.sopt} aria-label="add">
        <SearchIcon />
      </Fab>

      <ScrollContainer
        style={{
          maxHeight: 'calc(100vh - 90px)',
          overflow: 'auto',
          cursor: 'default',
        }}
      >
        <div style={{ minHeight: 'calc(100vh - 113px)' }}>
          <Container id="searchContainer" fluid={true}>
            {news.length === 0 ? (
              <div className="mx-auto text-sm-center mt-5 font-weight-bold text-danger">
                <div className="my-auto">Sin elementos encontrados</div>
              </div>
            ) : (
              <Row style={{ marginTop: '38px' }}>
                {news.map((item, idx) => {
                  return (
                    <Col id={mode + '_' + item.id} xs={12} sm={6} md={4} lg={3} key={idx} className="m-0 p-1">
                      <MiniNotContent item={item} deleteElement={deleteElement} />
                    </Col>
                  );
                })}
              </Row>
            )}
          </Container>
        </div>
      </ScrollContainer>
      <ModalSearchOptions
        openModalSearchOpt={openModalSearchOpt}
        setOpenModalSearchOpt={setOpenModalSearchOpt}
        setLoadingNews={setLoadingNews}
      />
    </div>
  );
};

const ModalSearchOptions = ({ openModalSearchOpt, setOpenModalSearchOpt, setLoadingNews }) => {
  const handleDateChangeIni = (e) => {
    setDateIni(convertDate1(e.target.value));
  };

  const handleDateChangeFin = (e) => {
    setDateFin(convertDate1(e.target.value));
  };

  const { dateIni, dateFin, setDateIni, setDateFin, perPage, setPerPage } = useContext(GAppContext);

  const convertDate1 = (cDate) => {
    let aDate = new Date(cDate);
    let dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    let [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(aDate);
    return `${year}-${month}-${day}`;
  };

  const convertDate2 = (cDate) => {
    let aDate = new Date(cDate);
    let dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    let [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(aDate);
    return `${day}-${month}-${year}`;
  };

  const classes = useStyles();

  const handleClose = () => {
    setOpenModalSearchOpt(false);
  };

  return (
    <Modal className={classes.modal} open={openModalSearchOpt} onClose={handleClose}>
      <Card className={classes.card}>
        <CardActions className={classes.cardActions}>
          <label>Opciones de busqueda</label>
          <div className={classes.modalClose}>
            <IconButton aria-label="add to favorites">
              <CloseIcon onClick={(e) => handleClose()} />
            </IconButton>
          </div>
        </CardActions>
        <CardContent className={classes.cardContent}>
          <div id="#options" className="text-left">
            <div className="d-flex ml-2">
              <div className={classes.searchLabel}>Desde: </div>

         

              <TextField
                id="date"
                type="date"
                value={dateIni}
                min={convertDate2(dateFin)}
                onChange={handleDateChangeIni}
                className={classes.dateInput}
              />
            </div>

            <div className="d-flex ml-2">
              <div className={classes.searchLabel}>Hasta: </div>
          
              <TextField
                id="date"
                type="date"
                value={dateFin}
                max={convertDate2(dateIni)}
                onChange={handleDateChangeFin}
                className={classes.dateInput}
              />
            </div>

            <div className="d-flex ml-2">
              <div className={classes.searchLabel}>Por pagina: </div>
              <TextField
                className={classes.perPage}
                id="date"
                type="number"
                min={1}
                max={250}
                value={perPage}
                className={classes.inputPage}
                onChange={(e) => setPerPage(parseInt(e.target.value))}
              />
            </div>
            <div className="mt-4 text-center">
              <Button
                variant="contained"
                className={classes.button}
                onClick={(e) => setLoadingNews(true)}
                startIcon={<SearchIcon />}
              >
                Buscar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default NotContentPanel;
