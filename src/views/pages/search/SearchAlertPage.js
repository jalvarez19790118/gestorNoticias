import React,{useContext} from 'react';
import {MyContext} from '../../../context/MyContext';
import NotContentPanel from './NotContentPanel';


const SearchAlertPage = () => {

    const {alertas} = useContext(MyContext);



    return (<div>
        <NotContentPanel items={alertas}></NotContentPanel>
    </div>);
}
 
export default SearchAlertPage;