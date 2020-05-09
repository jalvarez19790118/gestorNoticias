import React, {useEffect}from 'react';
import {Container, Row, Col} from 'reactstrap';
import NotContent from './NotContent';
import $ from 'jquery';
import ScrollContainer from "react-indiana-drag-scroll";

const NotContentPanel = ({items}) => {

  let  ref = null;



  useEffect(() => { $(ref).fadeIn(300); }, []);
 



    return (

        <div ref={div => ref = div} style={{'display' : 'none'}}>

      

        <ScrollContainer
        style={{
        'maxHeight': 'calc(100vh - 90px)',
        'overflow': 'auto',
        'cursor': 'default'
    }}>
        <Container fluid={true} className="NotContentPanel">
             
 
              
           

            <Row>
                {items.map((item, idx) => {
                    return <Col sm="12" md="6"  lg="2" xl="2"  key={idx} className="m-0 p-1">
                       <NotContent item={item}></NotContent>
                    </Col>
                })}

            </Row>
        </Container>
        </ScrollContainer>

        </div>
    );
}

export default NotContentPanel;