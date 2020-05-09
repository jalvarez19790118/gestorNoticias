import React, {useContext, useEffect,useState} from 'react';
import {MyContext} from '../../../context/MyContext';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import Pagination from "react-js-pagination";

import NotContentPanel from './NotContentPanel';
import LoadingCard from './LoadingCard';








const SearchNotPage = (props) => {

    const [first, setFirst] = useState(true);

     let { id } = props.match.params;
    
    const {news, size,  currentPage, loadingNews, refreshNewsData } = useContext(MyContext);

     
     useEffect(() => {

        if (first) setFirst(false);
        if (!loadingNews) refreshNewsData(id); 
      

     }, [news,size,currentPage]);
 
   
     
    return (
        
       
        <div>
        
        
        {!first ?  <NotHeader /> : null }
        

            {first  ? <LoadingCard/> :  
            
            <NotContentPanel  items={news}></NotContentPanel>
           
            }

         {!first ? <NotFooter /> : null }
        </div>
  



    );
}




const NotHeader = () => {
    


    const {size,allResults,setNewSize} = useContext(MyContext);
    const option_telem = [5,10,15,20,30,40,50,60,70,80,90,100];

 
    
    return (

        <Container className="totaElemContainer p-0" fluid={true} >

        <Row className="m-0 p-0">

     
   
     
              <Col sm='12' md='6' className="m-0 p-0">
        
                  <FormGroup className="d-flex p-0 m-0 my-1 text-center">
                      <Label className="p-0 my-auto mr-2 ml-3">Mostrando</Label>
                      <Input type="select" value={size} onChange={e=>{setNewSize(e.target.value)}} name="totalElem" id="totalElem">
                      {option_telem.map((option, idx) => <option key={idx}>{option}</option>)}
                      
                      </Input>
                      <Label className="p-0 my-auto ml-2 mr-2">resultados de <b>{allResults}</b> resultados </Label>
                  </FormGroup>
        
              </Col>


              <Col sm='12' md='2' className="m-0 p-0"></Col>


              <Col sm='12' md='4' className="m-0 p-0">
              
          


              </Col>
          </Row>
        
        
        </Container>

    )
}

const NotFooter = () => {
    

    const {size,pages,currentPage,setNewCurrentPage} = useContext(MyContext);
    return  (

        <div className="NotFooter my-auto p-0 container-fluid"  >

      
              
             
              <Pagination
               hideNavigation
                 activePage={currentPage}
                 itemsCountPerPage={size}
                 totalItemsCount={pages*size}
                 pageRangeDisplayed={10}
                 onChange={newpage=>{setNewCurrentPage(newpage)}} 
             />



        
        </div>


    )
}


export default SearchNotPage;