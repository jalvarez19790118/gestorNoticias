import React, { useContext, useEffect, useState, Fragment } from 'react';
import { MyContext } from '../../../context/MyContext';
import SearchHeader from './SearchHeader';
import NotContentPanel from './NotContentPanel';
import LoadingCard from '../../commons/LoadingCard';
import { useParams } from 'react-router-dom';

const SearchNotPage = () => {
  const [onpanel, setOnPanel] = useState(4);
  const [loadingNews, setLoadingNews] = useState(true);

  let { id } = useParams();

  const init_date = new Date();
  const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(init_date);

  const { currentDate, setCurrentDate, obtieneNoticias } = useContext(MyContext);

  const today = year + '-' + month + '-' + day;


  useEffect(() => {
    if (loadingNews) {
 
      let day_to_seach = currentDate;
    
      if  (day_to_seach == null) day_to_seach = today;
      setCurrentDate(day_to_seach);  
      
      obtieneNoticias(id, day_to_seach).then(() => {
        setLoadingNews(false);
      });
    }
  }, [loadingNews]);

  return (
    <Fragment>
      {loadingNews ? (
        <LoadingCard />
      ) : (
        <div>
         
          <SearchHeader currentDate={currentDate} setCurrentDate={setCurrentDate} setLoadingNews={setLoadingNews} />
          <NotContentPanel mode={id} onpanel={onpanel}></NotContentPanel>

       
        </div>
      )}
    </Fragment>
  );
};



export default SearchNotPage;
