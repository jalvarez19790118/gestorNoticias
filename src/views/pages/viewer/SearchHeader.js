import React, { useState, useContext } from 'react';
import 'date-fns';
import EsLocale from 'date-fns/locale/es';
import DateFnsUtils from '@date-io/date-fns';
import { Container, Row, Col } from 'reactstrap';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { GAppContext } from '../../../context/GAppContext';
import { MyContext } from '../../../context/MyContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router-dom';

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersModal: {
      border: '2px solid',
    },

    MuiPickersT: {
      border: '1px solid',
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#162c50',
      },
    },

    MuiPickersDay: {
      day: {
        color: '#162c50',
      },
      daySelected: {
        backgroundColor: '#162c50',
      },

      current: {
        color: '#800',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#eee',
      },

      dialogRoot: {
        border: '1px solid #162c50',
        boxShadow: ' 1px 1px 1px 1px rgba(0, 0, 0, 0.2) !important;',
      },
    },

    MuiDialogActions: {
      root: {
        borderTop: '1px solid #162c50',
      },
    },

    MuiButton: {
      root: {
        backgroundColor: '#162c50 !important',
        color: '#fff !important',
        textTransform: 'none !important',
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: '0.25rem',
    border: '1px solid #162c50',
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    padding: '4px',
  },
  button: {
    textTransform: 'unset',
    boxShadow: 'unset',
    background: '#162c50 !important',
    color: '#fff !important',
    borderRadius: '0.35rem !important',
    position: 'relative',
    padding: '12px',
    marginBottom: 'auto',
    marginRight: '5px',
    marginLeft: '10px',
    marginTop: '2px !important',

    '&:hover': {
      textTransform: 'unset',
      boxShadow: 'unset',
      background: '#162c50',
      color: '#fff',
    },
  },

  result: {
    fontWeight: 'bold',
    fontSize: '15px',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#162c50',
    height: '30px',
    lineHeight: '35px',
    marginLeft: '5px',
  },

  searchLabel: {
    fontWeight: 'bold',
    fontSize: '15px',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#162c50',
    height: '30px',
    lineHeight: '30px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  perPage: {
    maxWidth: '100px',
    width: '100px',
    marginLeft: '5px',
  },

  lz: {
    margin: '0px',
    padding: '0px',

    ['@media (max-width:973px)']: {
      // eslint-disable-line no-useless-computed-key
      maxWidth: '100%',
      width: '100%',
      flex: '0 0 100%',
      textAlign: 'center',
    },

    ['@media (max-width:575px)']: {
      // eslint-disable-line no-useless-computed-key
      textAlign: 'center',
    },
  },

  rz: {
    margin: '0px',
    padding: '0px',

    ['@media (max-width:973px)']: {
      // eslint-disable-line no-useless-computed-key
      maxWidth: '100%',
      width: '100%',
      flex: '0 0 100%',
    },

    ['@media (max-width:973px)']: {
      // eslint-disable-line no-useless-computed-key
      display: 'none',
    },
  },

  dateInput: {
    width: '160px',
    fontSize: '12px',
  },

  inputPage: {
    width: '65px',
    fontSize: '12px',
  },
}));

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

const SearchHeader = ({ setLoadingNews }) => {
  const classes = useStyles();

  const { dateIni, dateFin, setDateIni, setDateFin, perPage, setPerPage } = useContext(GAppContext);
  const { allResults, currentPage, endResult } = useContext(MyContext);

  const handleDateChangeIni = (e) => {
    setDateIni(convertDate1(e.target.value));
  };

  const handleDateChangeFin = (e) => {
    setDateFin(convertDate1(e.target.value));
  };

  let { id } = useParams();

  return (
    <Container className="EditorHeader p-0" fluid={true}>
      <Row className="m-0 p-0">
        <Col sm={4} className={classes.lz}>
          {parseInt(allResults) > 0 ? (
            <div className={classes.result}>
              Mostrando desde {currentPage} hasta {endResult} de {allResults} {id}
            </div>
          ) : null}
        </Col>

        <Col sm={8} className={classes.rz}>
          <div id="#options" className="display-flex float-right">
            <div className={classes.searchLabel}>Desde: </div>

           
            <TextField
              id="date"
              type="date"
              value={dateIni}
              min={convertDate2(dateFin)}
              onChange={handleDateChangeIni}
              className={classes.dateInput}
            />

            <div className={classes.searchLabel}>hasta: </div>
            <TextField
              id="date"
              type="date"
              value={dateFin}
              max={convertDate2(dateIni)}
              onChange={handleDateChangeFin}
              className={classes.dateInput}
            />

          
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

            <Button
              variant="contained"
              className={classes.button}
              onClick={(e) => setLoadingNews(true)}
              startIcon={<SearchIcon />}
            >
              Buscar
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchHeader;
