import React, { useContext, useEffect, useState, Fragment } from 'react';
import { MyContext } from '../../../context/MyContext';
import { FormContext } from '../../../context/FormContext';
import SearchHeader from './SearchHeader';
import SearchFooter from './SearchFooter';
import NotContentPanel from './NotContentPanel';

import LoadingCard from '../../commons/LoadingCard';
import { useParams } from 'react-router-dom';
import { GAppContext } from '../../../context/GAppContext';
import Fade from '@material-ui/core/Fade';

const SearchNotPage = () => {
  const [loadingNews, setLoadingNews] = useState(true);
  const [fadePage, setFadePage] = useState(true);

  let { id } = useParams();
  const { dateIni, dateFin, page, perPage } = useContext(GAppContext);
  const { setFirst } = useContext(FormContext);

  let totalNews = 0;

  const { obtieneNoticias, totalPaginas, allResults } = useContext(MyContext);

  useEffect(() => {
    if (loadingNews) {
      obtieneNoticias(id, dateIni, dateFin, page, perPage).then(() => {
        setLoadingNews(false);
        setFirst(true);
      });
    }
  }, [loadingNews]);

  return (
    <Fragment>
      {loadingNews ? (
        <LoadingCard />
      ) : (
        <div>
          <SearchHeader setLoadingNews={setLoadingNews} />
          <Fade in={fadePage}>
            <NotContentPanel mode={id} onpanel={4} setLoadingNews={setLoadingNews}></NotContentPanel>
          </Fade>
          {parseInt(totalPaginas) > 1 ? <SearchFooter setFadePage={setFadePage} /> : null}
        </div>
      )}
    </Fragment>
  );
};

export default SearchNotPage;
