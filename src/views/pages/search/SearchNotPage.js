import React,{useContext} from 'react';
import {MyContext} from '../../../context/MyContext';
import NotContentPanel from './NotContentPanel';


const SearchNotPage = () => {

    const {noticias} = useContext(MyContext);



    return (<div>
        <NotContentPanel items={noticias}></NotContentPanel>
    </div>);
}
 
export default SearchNotPage;