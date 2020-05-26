import React, {useContext, useEffect,useState} from 'react';
import {MyContext} from '../../../context/MyContext';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import Pagination from "react-js-pagination";

import NotContentPanel from './NotContentPanel';
import LoadingCard from '../../commons/LoadingCard';








const SearchNotPage = (props) => {

    const [first, setFirst] = useState(true);
    const [onpanel, setOnPanel] = useState(4);

    
 



     let { id } = props.match.params;
    
    const {news, size,  currentPage, loadingNews, refreshNewsData } = useContext(MyContext);

     
     useEffect(() => {

        if (first) setFirst(false);
        if (!loadingNews) refreshNewsData(id); 
      

     }, [news,size,currentPage]);
 
   
     
    return (
        
       
        <div>
        
        
        {!first ?  <NotHeader onpanel={onpanel} setOnPanel={setOnPanel} /> : null }
        

            {first  ? <LoadingCard/> :  
            
            <NotContentPanel onpanel={onpanel} items={news}></NotContentPanel>
           
            }

         {!first ? <NotFooter /> : null }
        </div>
  



    );
}




const NotHeader = ({onpanel,setOnPanel}) => {
    

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);



    const updateOnpanelSize= () => {
        
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);


         if (width >= 1500  ) setOnPanel(6);
         if (width <= 1499 && width >= 1200 ) setOnPanel(4);
         if (width <= 1199 && width >= 993 ) setOnPanel(3);
         if (width <= 992 && width >= 767  ) setOnPanel(2);
         if (width <= 766 ) setOnPanel(1);
         

     };



 useEffect(() => {
        window.addEventListener("resize", updateOnpanelSize);
        return () => window.removeEventListener("resize", updateOnpanelSize);
    });
   

    const {size,allResults,setNewSize} = useContext(MyContext);



    const option_telem = [5,10,15,20,30,40,50,60,70,80,90,100];
    
  
    
    return (

        <Container className="totaElemContainer p-0" fluid={true} >

        <Row className="m-0 p-0">

     
   
     
              <Col sm='12' md='8' className="m-0 p-0">

                
                  
                  <FormGroup className="d-flex p-0 m-0 my-1 text-center">
                      <Label className="p-0 pl-3 my-auto mr-2 ml-3">Mostrando:</Label>
                      <Input type="select" value={size} onChange={e=>{setNewSize(e.target.value)}} name="totalElem" id="totalElem">
                      {option_telem.map((option, idx) => <option key={idx}>{option}</option>)}
                      
                      </Input>
                      <Label className="p-0 my-auto ml-2 mr-2">resultados de <b>{allResults}</b> resultados </Label>
                      <Label className="p-0 pl-3 my-auto mr-2 ml-3">Columnas:</Label>
                      <Input  type="select" value={onpanel} onChange={e=>{setOnPanel(e.target.value)}} name="onPanel" id="onPanel">
                       <option>1</option>
                       {width >= 767  ? <option>2</option> : null }
                       {width >= 993  ? <option>3</option> : null }
                       {width >= 1200  ? <option>4</option> : null }
                       {width >= 1500  ? <option>6</option> : null }
                      </Input>
                    
                  </FormGroup>
        

              </Col>

                
              <Col sm='12' md='4' className="m-0 p-0 text-left">


            


              </Col>


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