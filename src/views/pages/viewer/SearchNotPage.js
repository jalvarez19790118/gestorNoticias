import React, { useContext, useEffect, useState, Fragment } from 'react';
import { MyContext } from '../../../context/MyContext';
import { FormContext } from '../../../context/FormContext';
import SearchHeader from './SearchHeader';
import NotContentPanel from './NotContentPanel';
import LoadingCard from '../../commons/LoadingCard';
import { useParams } from 'react-router-dom';
import { GAppContext } from '../../../context/GAppContext';


const SearchNotPage = () => {

  const [loadingNews, setLoadingNews] = useState(true);
  const [onpanel, setOnPanel] = useState(4);
  let { id } = useParams();
  const {selectGDate} = useContext(GAppContext);
  const {setFirst } = useContext(FormContext);

  const {setCurrentDate, obtieneNoticias } = useContext(MyContext);

  
  let date_selected = sessionStorage.getItem('selec_date');

  useEffect(() => {

  
  
    if (loadingNews) {
     
     

   
     
     if (date_selected == null) 
     {

      let dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
      let [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(new Date());
      sessionStorage.setItem('selec_date', `${year}-${month}-${day}`);
      date_selected =  sessionStorage.getItem('selec_date');
    

     }

    

      obtieneNoticias(id, date_selected).then(() => {
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
          <SearchHeader date_selected={date_selected} setLoadingNews={setLoadingNews} /> 
          <NotContentPanel mode={id} onpanel={onpanel}></NotContentPanel>
        </div>
      )}
    </Fragment>
  );
};

export default SearchNotPage;
