import React, { useState, Fragment } from 'react';
import MyIcon from '../../../created/components/SidebarNav/components/MyIcon';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import { Toast, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Badge from '@material-ui/core/Badge';


const NotContent = ({ mode, item, deleteElement, cloneElement }) => {


  const useStyles = makeStyles((theme) => ({
    news_title: {
      fontSize: '25px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#162c50',
     
      whiteSpace: 'break-spaces'
     },
    
     author: {

      fontSize: '12px',
      fontWeight: 'bold',
    
      textAlign:'left',
      width: '100%',
      margin: '5px',
      marginTop: '0px',
      marginLeft: '0px',
      color: '#000'

     },

     entradilla: {

      color: '#666',
      fontStyle: 'italic',
      fontSize: '18px',
      marginBottom: '5px',
      textAlign: 'left',
      marginLeft: '2px',
      marginTop: '10px',
      marginRight: '2px',
   
     },

     cardContent : 
     {
       cursor: 'pointer'
     },

     imagenNoticia:{
       borderRadius: '0.25rem',
       border: '1px solid #162c50',
       marginTop: '10px',
       marginBottom: '10px',
       width: '100%'
      
     },
     categoria: {

     
      color: '#666',
      fontStyle: 'italic',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign:'right',
      width: '100%',
      margin: '5px',
      marginTop: '0px',
      marginRight: '0px'
     },
  
     badge: {

     
      color: '#ff',
      background: '#162c50',
      fontWeight: 'bold',
      float: 'right',
      color: '#fff',
      padding: '4px',
      fontSize: '12px',
      borderRadius: '0.2rem'

     }
  
  }));

    const classes = useStyles();


  let d = new Date(item.fh_public);

  let dtf = new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',

    hour12: false,
  });

  let [{ value: da }, , { value: mo }, , { value: ye }, , { value: ho }, , { value: mi }] = dtf.formatToParts(d);
  let format_data = `${da}/${mo}/${ye}`;

  const parse = require('html-react-parser');

  const history = useHistory();

  const styleObj = {
    fontSize: '18px',
    marginTop: '5px',
  };

  const IconView = (
    <MyIcon
      item={{
        lib: 'Feather',
        name: 'FiEye',
        style: styleObj,
      }}
    />
  );

  const IconEdit = (
    <MyIcon
      item={{
        lib: 'Feather',
        name: 'FiEdit',
        style: styleObj,
      }}
    />
  );

  const IconCopy = (
    <MyIcon
      item={{
        lib: 'Feather',
        name: 'FiCopy',
        style: styleObj,
      }}
    />
  );

  const IconDelete = (
    <MyIcon
      item={{
        lib: 'Feather',
        name: 'FiXCircle',
        style: styleObj,
      }}
    />
  );

  const IconInfo = (
    <MyIcon
      item={{
        lib: 'Feather',
        name: 'FiInfo',
        style: styleObj,
      }}
    />
  );

  const navigateToEdit = () => {
    let site = mode.slice(0, -1);
    window.location.replace(`/gestor/editor/editar_${site}/${site}/${item.id}`);
  };

  
  const [showDelete, setShowDelete] = useState(false);
  const [showClone, setShowClone] = useState(false);
  const [showModal, setShowModal] = useState(false);



  return (
    <Fragment>
      <Card className="NotContent m-0 p-0">
        <CardActions className="m-0 p-1 NotContentHeader" disableSpacing>
          <div className="float-left w-75">
            <Button onClick={(e) => navigateToEdit()}>{IconEdit}</Button>
            <Button
              onClick={(e) => {
                if (!showDelete) {
                  setShowClone(true);
                }
              }}
            >
              {IconCopy}
            </Button>
           
          </div>

          <div className="float-right w-25 text-right">

          <Button
              onClick={(e) => {
                if (!showClone) {
                  setShowDelete(true);
                }
              }}
            >
              {IconDelete}
            </Button>
        
          </div>
        </CardActions>
        <CardContent className={classes.cardContent}  onClick={(e) => {
                setShowModal(true);
              }}>
          <ToastDelete
            mode={mode}
            id={item.id}
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            deleteElement={deleteElement}
          />

          <ToastClone
            mode={mode}
            item={item}
            showClone={showClone}
            setShowClone={setShowClone}
            cloneElement={cloneElement}
          />


          

          <div className={classes.news_title} >
          {parse(item.titular)}
          </div>
          <Divider className="mb-2" />

          <div>
            <Grid container >
              <Grid container item xs={12}  sm={12} >
                <div>
               <span className={classes.author}>VADEMECUM - {format_data}</span>
               <span className={classes.categoria}>{item.desc_categoria}</span>
               </div>
             </Grid>
            </Grid>
          </div>
       


 
          {item.imagen_noticia.length > 0 ? <img className={classes.imagenNoticia} src={`https://static.vademecum.es/documentos/banco_imagenes_noticias/${item.imagen_noticia}`} alt={item.imagen_noticia} /> : null}

      
       
          <div className={classes.entradilla} >
          {parse(item.entradilla)}

          </div>

         
      <Divider className="mb-2" />
          {item.palabra_clave.length > 0 ? <div className="text-right"><div className={classes.badge}>{item.palabra_clave} </div></div> : null}
        </CardContent>

      
      </Card>

      <ModalWrapperItem open={showModal} setOpen={setShowModal} item={item} formatData={format_data} />
    </Fragment>
  );
};

export default NotContent;

const ToastDelete = ({ mode, id, showDelete, setShowDelete, deleteElement }) => {
  const IconLoad = (
    <MyIcon
      item={{
        class: 'fa-pulse',
        lib: 'Fa',
        name: 'FaSpinner',
        style: {
          fontSize: '16px',
          color: '#800',
          marginRight: '5px',
        },
      }}
    />
  );

  const [removing, setRemoving] = useState(false);
  const [errorRemoving, setErrorRemoving] = useState(false);

  return (
    <Toast
      show={showDelete}
      onClose={() => {
        $('#' + mode + '_' + id + ' .card').css({ border: '1px solid #aaa' });
        setRemoving(false);
        setErrorRemoving(false);
        setShowDelete(false);
      }}
      className="ToastDelete m-auto p-0"
      autohide
      delay={5000}
    >
      <Toast.Header>Eliminar {mode.replace('s', '')}</Toast.Header>

      {!removing ? (
        <Toast.Body>
          <div className="m-0 p-0">¿Seguro que desea eliminar la {mode.replace('s', '')} ?</div>
          <div className="m-0 p-0 py-1">
            <button
              onClick={(e) => {
                e.preventDefault();
                $('#' + mode + '_' + id + ' .card').css({ border: '1px solid #aaa' });
                setShowDelete(false);
              }}
              className="text-center m-0 mr-1 p-0"
            >
              No
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setRemoving(true);
                deleteElement(id, setErrorRemoving);
              }}
              className="text-center   m-0 mr-1 p-0"
            >
              Si
            </button>
          </div>
        </Toast.Body>
      ) : (
        <Toast.Body>
          <div className="m-1 p-1">
            {!errorRemoving ? (
              <Fragment>
                {' '}
                {IconLoad}Eliminado {mode.replace('s', '')} ...
              </Fragment>
            ) : (
              <Fragment>Se ha producido un error</Fragment>
            )}
          </div>
        </Toast.Body>
      )}
    </Toast>
  );
};

const ToastClone = ({ mode, item, showClone, setShowClone, cloneElement }) => {
  const [cloning, setCloning] = useState(false);
  const [errorCloning, setErrorCloning] = useState(false);

  const IconLoad = (
    <MyIcon
      item={{
        class: 'fa-pulse',
        lib: 'Fa',
        name: 'FaSpinner',
        style: {
          fontSize: '16px',
          color: '#0f6086',
          marginRight: '5px',
        },
      }}
    />
  );

  return (
    <Toast
      show={showClone}
      onClose={() => {
        $('#' + mode + '_' + item.id + ' .card').css({ border: '1px solid #aaa' });
        setErrorCloning(false);
        setCloning(false);
        setShowClone(false);
      }}
      className="ToastClone m-auto p-0"
      autohide
      delay={5000}
    >
      <Toast.Header>Duplicar {mode.replace('s', '')}</Toast.Header>

      {!cloning ? (
        <Toast.Body>
          <div className="m-0 p-0">¿Seguro que desea duplicar la {mode.replace('s', '')} ?</div>
          <div className="m-0 p-0 py-1">
            <button
              onClick={(e) => {
                e.preventDefault();
                $('#' + mode + '_' + item.id + ' .card').css({ border: '1px solid #aaa' });
                setShowClone(false);
              }}
              className="text-center m-0 mr-1 p-0"
            >
              No
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setCloning(true);
                cloneElement(item, setShowClone, setCloning, setErrorCloning);
              }}
              className="text-center   m-0 mr-1 p-0"
            >
              Si
            </button>
          </div>
        </Toast.Body>
      ) : (
        <Toast.Body>
          <div className="m-1 p-1">
            {!errorCloning ? (
              <Fragment>
                {IconLoad}Duplicando {mode.replace('s', '')} ...
              </Fragment>
            ) : (
              <Fragment>Se ha producido un error</Fragment>
            )}
          </div>
        </Toast.Body>
      )}
    </Toast>
  );
};

const ModalWrapperItem = ({ open, setOpen, item, formatData }) => {
  

    const defined_links = {

      atc : ['Atcs','atc_desc'],
      medicamentos: ['Medicamentos','nombre'],
    
      enfermedad: ['Enfermedades','nombre'],
      entidad: ['Entidades','desc_entidad'],
      laboratorio: ['Laboratorios','nombre'],
      vinculos: ['Vinculos','desc']

    }



  let d = new Date(item.fh_public);

  let dtf = new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',

    hour12: false,
  });

  let [{ value: da }, , { value: mo }, , { value: ye }, , { value: ho }, , { value: mi }] = dtf.formatToParts(d);
  let format_data = `${da}/${mo}/${ye}`;

  const parse = require('html-react-parser');

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      background: '#fff',
      border: '1px solid #162c50',
      borderRadius: '0.35rem',
      boxShadow: theme.shadows[1],
      padding: '2px',
      margin: '2px',
      width: 'calc(100% - 10px)',
      maxWidth: '800px',
      height: 'calc(100vh - 10px)',
      zIndex: '100000',
    },

    card: {
      padding: '0px',
      margin: '0px',
      borderBottomLeftRadius: '0px',
      borderBottomRightRadius: '0px',
      boder: '0px solid',
      boxShadow: 'unset',
   
     
    },

    cardActions: {
  
      padding: '0px',
      margin: '0px',
      borderBottom: '1px solid #aaa',
      background: '#162c50',

      '& svg': {
        fill: '#fff',
        fontSize: '20px'
       
      },
    },

    cardContent: {
      paddingTop: '5px',
      paddingBottom: '5px !important',
      maxHeight: 'calc(100vh - 65px)',
    },

    scrollContainer: {
      height: 'calc(100vh - 75px) !important',
      maxHeight: 'calc(100vh - 75px) !important',
      overflow: 'auto',
      cursor: 'default',
    },

    fab: {
      position: 'relative',
      bottom: '40px',
      left: 'calc(100% - 30px)',
      boxShadow: 'unset',
      background: '#162c50',

      '& svg': {
        fill: '#fff',
      },
    },

    list: {
      '& li': {
        padding: '0px',

        '& svg': {
          fill: '#162c50',
        },

        '& div': {
          padding: '0px',
          minWidth: 'unset',
          marginBottom: 'auto',
          marginTop: '5px',

          '& span': {
            fontSize: '0.8rem',
            color: '#162c50',

            fontWeight: 'bold',
          },
        },
      },
    },

    listLabel: {
      fontWeight: 'bold',
      fontSize: '0.9rem',
    },


    news_title: {
      fontSize: '25px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#162c50',
     
      whiteSpace: 'break-spaces'
     },

    modalClose : {

      width: '100%',
    
   
  

      '& button' : 
       {
       float: 'right',
         background :'#162c50',
       margin: '0px',
       padding: '4px'
        
       }

    }, 
    
    author: {

      fontSize: '12px',
      fontWeight: 'bold',
    
      textAlign:'left',
      width: '100%',
      margin: '5px',
      marginTop: '0px',
      marginLeft: '0px',
      color: '#000'

     },

     entradilla: {

      color: '#666',
      fontStyle: 'italic',
      fontSize: '18px',
      marginBottom: '5px',
      textAlign: 'left',
      marginLeft: '2px',
      marginTop: '10px',
      marginRight: '2px',
   
     },
     categoria: {

     
      color: '#666',
      fontStyle: 'italic',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign:'left',
      width: '100%',
      margin: '5px',
      marginTop: '0px',
      marginRight: '0px'
     },

     contenido: {

  marginTop: '15px',

     },
     cardContent : 
     {
      
      height: 'calc(100vh - 50px)',
      marginTop: '5px',
      paddingTop: '0px',
      overflow : 'auto',
        '& table' : {
          width: '100% !important'
        },

        '& p' : {
          marginTop: '0.5rem',
          marginBottom: '0.5rem'
        }
     },
  
  linkButtons: {

 
    fontSize: '12px',
    color: '#000',
    fontWeight: 'bold',
    background: '#fff !important',
    marginBottom: '10px',
marginLeft: '-5px',
    '& svg': {

      marginRight: '5px'
    }

  },

  imagenNoticia:{
    borderRadius: '0.25rem',
    border: '1px solid #162c50',
    marginTop: '10px',
    marginBottom: '10px',
    width: '100%'
   
  },

  subHeader: {

    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000',
   
    lineHeight: 'unset',
    margin: '0px',
    padding: '0px',
    marginBottom: '10px',
    marginTop: '5px'
  },

  listItemText: {

    fontSize: '10px',
    fontWeight: 'bold',
    color: '#162c50',
    lineHeight: 'unset',
    margin: '0px',
    padding: '0px',

    '& span' : {

      fontSize: '13px',
      fontWeight: 'bold'
    }
  },

  listItemIcon: {

    minWidth: '0px'

   }







  }));

  const classes = useStyles();


  const [showLinks, setShowLinks] = useState(true);


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Card className={classes.card}>
            <CardActions id={`cabecera_noticia_${item.id}`} className={classes.cardActions}>
               
              <div className={classes.modalClose}>
                <IconButton aria-label="add to favorites">
                  <CloseIcon onClick={(e) => handleClose()} />
                </IconButton>
              </div>

          
            </CardActions>
            <CardContent id={`cuerpo_noticia_${item.id}`} className={classes.cardContent}>

           

            <div className={classes.news_title}>

{parse(item.titular)}    
 

</div>

<Divider className="mb-2" />

<div>
            <Grid container >
              <Grid container item xs={12}  sm={12} >
                <div>
               <span className={classes.author}>VADEMECUM - {format_data}</span>
               <span className={classes.categoria}>{item.desc_categoria}</span>
               </div>
             </Grid>
            </Grid>
          </div>
       

 
<div className={classes.entradilla} >
{parse(item.entradilla)}

</div>

{item.imagen_noticia.length > 0 ? <img class={classes.imagenNoticia} src={`https://static.vademecum.es/documentos/banco_imagenes_noticias/${item.imagen_noticia}`} alt={item.imagen_noticia} /> : null}

          
        


<div className={classes.contenido} >
{parse(item.contenido_html)}

</div>

<div>

<Divider className="mb-2" />

{showLinks ? 
<IconButton onClick={e=>setShowLinks(false)} disableRipple={true} variant="contained" size="small" className={classes.linkButtons}>
  <RemoveCircleIcon /> Ocultar Vinculos
</IconButton> :

<IconButton  onClick={e=>setShowLinks(true)}  disableRipple={true} variant="contained" size="small" className={classes.linkButtons}>
  <AddCircleIcon /> Mostrar Vinculos
</IconButton> }
</div>
  


<Collapse in={showLinks}>

    <Grid container spacing={1}>


    {item.palabra_clave.length > 0 ?
    
      <Grid item xs={12} sm={6}>
      <Grid item xs={12} sm={6}>
      <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader className={classes.subHeader} component="div" id="nested-list-subheader">
         Palabras clave
        </ListSubheader>
      }
     
    >
    <ListItem className="m-0 p-0" >
            <ListItemIcon className={classes.listItemIcon}>
                    <ArrowRightIcon />
                  </ListItemIcon>
              <ListItemText className={classes.listItemText}>{item.palabra_clave}</ListItemText>
            </ListItem>
    </List>

      </Grid>
      </Grid>
    
     : null}


       {Object.entries(defined_links).map((obj)=>(


       (item[obj[0]] !== undefined && item[obj[0]].length > 0   ?   
        <Grid item xs={12} sm={6}>
        <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader className={classes.subHeader} component="div" id="nested-list-subheader">
         {obj[1][0]}
        </ListSubheader>
      }
     
    >
       {item[obj[0]].map((elem,key) => (
          
            <ListItem key={key} className="m-0 p-0" >
            <ListItemIcon className={classes.listItemIcon}>
                    <ArrowRightIcon />
                  </ListItemIcon>
              <ListItemText className={classes.listItemText}>{elem[obj[1][1]]}</ListItemText>
            </ListItem>
       
       ))}
    
    
    </List>
        </Grid>
        : null)
       ))}

    </Grid> 
</Collapse>

            </CardContent>
          </Card>
        </div>
      </Fade>
    </Modal>
  );
};
