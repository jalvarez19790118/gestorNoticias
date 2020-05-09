import React, {useContext, useEffect} from 'react';
import {MyContext} from '../../../context/MyContext';
import NotContentPanel from './NotContentPanel';
import LoadingCard from './LoadingCard';



const SearchNotPage = (props) => {

     let { id } = props.match.params;
    
    const {news,  loadingNews, refreshNewsData } = useContext(MyContext);

     
     useEffect(() => {
        refreshNewsData(id); 

     }, []);
 
     
    return (
       
        <div>
            {loadingNews ? <LoadingCard/> :  <NotContentPanel  items={news}></NotContentPanel>}
        </div>


    );
}

export default SearchNotPage;