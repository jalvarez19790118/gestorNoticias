import React, { useContext, useState } from 'react';
import { GAppContext } from '../../../context/GAppContext';
import { MyContext } from '../../../context/MyContext';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useParams } from 'react-router-dom';

const SearchFooter = ({ setFadePage }) => {
  const { dateIni, dateFin, perPage } = useContext(GAppContext);
  const { obtieneNoticias, totalPaginas } = useContext(MyContext);

  const aStyles = makeStyles({
    footer: {
      position: 'relative',
      top: '-30px',
      background: '#ddd',
      height: '30px',
      borderTop: '1px solid #162c50',
      boxShadow: '0 -1px 1px 1px rgba(0, 0, 0, 0.3), 0 -1px 1px 1px rgba(0, 21, 41, 0.1);',
    },

    page_container: {
      width: '100%',
      textAlign: 'center',
      display: 'inline-flex',
    },

    paginator: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '5px',

      '& button': {
        fontSize: '15px',
        fontWeight: 'bold',
        color: '#162c50',
        height: '20px',
        minWidth: '20px',
      },
      '& .Mui-selected': {
        background: '#162c50',
        color: '#fff',
      },
    },
  });

  const classes = aStyles();

  let { id } = useParams();

  const changeActivePage = (e, value) => {
    setFadePage(true);
    obtieneNoticias(id, dateIni, dateFin, value, perPage).then(() => {
      //  setFadePage(false);
    });
  };

  console.log(totalPaginas);
  return (
    <main className={classes.footer}>
      <div className={classes.page_container}>
        <Pagination onChange={changeActivePage} className={classes.paginator} count={totalPaginas} />
      </div>
    </main>
  );
};

export default SearchFooter;
