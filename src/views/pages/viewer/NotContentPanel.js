import React, { useEffect, useState, useContext } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Container, Row, Col } from 'reactstrap';
import NotContent from './NotContent';
import $ from 'jquery';
import { v4 as uuidv4 } from 'uuid';
import NotFullModal from './NotFullModal';
import { FormContext } from '../../../context/FormContext';
import { MyContext } from '../../../context/MyContext';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';



const NotContentPanel = ({ mode, onpanel }) => {
  let ref = null;

  const { news,setNews,obtieneNoticias } = useContext(MyContext);
  const { deleteNew, saveNew } = useContext(FormContext);



  useEffect(() => {
    $(ref).fadeIn(300);

    
  }, []);





  

  let current_items = [...news];

  const [modal, showModal] = useState({
    ...modal,
    show: false,
  });



  const onPageVal = parseInt(12 / onpanel);

  const deleteElement = (id,setErrorRemoving) => {
    try {
      const respuesta = deleteNew(mode, id);

      respuesta.then((data) => {
        if (data.status === 200) {
          $('#' + mode + '_' + id).fadeOut(() => {
            $('#' + mode + '_' + id).remove();

            current_items = current_items.filter((v, k) => v.id !== id);
          
          });
        } else {
        
          
          setErrorRemoving(true);
        }
      });
    } catch (error) {
      setErrorRemoving(true);
      console.log(error);
    }
  };

  const cloneElement = (item, setShowClone,setCloning,setErrorCloning) => {
  
    try {
    
      $('#' + mode + "_" + item.id + ' .card').css({'border' : '1px solid #aaa'});

    item.id = uuidv4();
    item.fields.id_act_not = item.id;
    item.fields.fh_public = new Date().toISOString();

    item.fields.titular = "(Copia)" + item.fields.titular
   
  
    const respuesta = saveNew(mode,item);

    respuesta.then((data) => {

      if (data.status === 201) {
      
        data.status = 2000;
       
        obtieneNoticias(mode).then(() =>{

      
    
          setShowClone(false);
           setCloning(false);
           
        })
       


      } else {
       
        setErrorCloning(true);
      }
     

    });

  } catch (error) {
    setErrorCloning(true);
    console.log(error);
  }
 
  };

  return (
    <div
      ref={(div) => (ref = div)}
      style={{
        display: 'none',
      }}
    >
      <NotFullModal modal={modal} showModal={showModal}></NotFullModal>


      <Fab size="medium" component={Link} to='/gestor/editor/nueva_noticia/noticia'  id="AddNewButton" aria-label="add">
  <AddIcon />
</Fab>




      <ScrollContainer
        style={{
          maxHeight: 'calc(100vh - 90px)',
          overflow: 'auto',
          cursor: 'default',
        }}
      >



        <Container fluid={true} className="NotContentPanel">

 

          {news.length === 0 ? (
            <div className="mx-auto text-sm-center mt-5 font-weight-bold text-danger">
              <div className="my-auto">Sin elementos encontrados</div>
            </div>
          ) : (
            <Row>
              {news.map((item, idx) => {
                return (
                  <Col id={mode + '_' + item.id} sm={onPageVal} key={idx} className="m-0 p-1">
                    <NotContent
                      mode={mode}
                      item={item}
                      modal={modal}
                      showModal={showModal}
                      deleteElement={deleteElement}
                      cloneElement={cloneElement}
                    ></NotContent>
                  </Col>
                );
              })}
            </Row>
          )}
        </Container>
      </ScrollContainer>

      
    </div>
  );
};



export default NotContentPanel;
