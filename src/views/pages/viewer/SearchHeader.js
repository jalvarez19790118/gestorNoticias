import React, { useState } from 'react';
import 'date-fns';
import EsLocale from 'date-fns/locale/es';
import DateFnsUtils from '@date-io/date-fns';
import { Container, Row, Col } from 'reactstrap';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';


import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

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

const SearchHeader = ({ currentDate, setCurrentDate, setLoadingNews }) => {

  
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (aDate) => {
    //   setSelectedDate(aDate);
    let dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });

    let [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(aDate);

    setCurrentDate(`${year}-${month}-${day}`);
    setLoadingNews(true);
    setSelectedDate(aDate);
  };

  return (
    <Container className="EditorHeader p-0" fluid={true}>
      <Row className="m-0 p-0">
        <Col sm="6" className="m-0 p-0">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={EsLocale} className="m-0 p-0">
            <ThemeProvider theme={materialTheme}>
              <KeyboardDatePicker
                className="m-0 p-0 ml-1"
                margin="normal"
                id="date-picker-dialog"
                format={'dd-MMMM-yyyy'}
                value={currentDate}
                onChange={handleDateChange}
                cancelLabel="Cancelar"
                okLabel="Aceptar"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </ThemeProvider>
          </MuiPickersUtilsProvider>
        </Col>
        <Col sm="6" className="m-0 p-0"></Col>
      </Row>
    </Container>
  );
};

export default SearchHeader;
