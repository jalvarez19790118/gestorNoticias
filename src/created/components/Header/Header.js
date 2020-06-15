import React, {useState,useContext, useEffect} from 'react';

import { Navbar } from 'reactstrap';
import { matchPath, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { GAppContext } from '../../../context/GAppContext';

import MyIcon from '../SidebarNav/components/MyIcon';



const Header = (props) => {
  

   const IconSelect = (
    <MyIcon
      item={{
        lib: 'Bs',
        name: 'BsFillCaretDownFill',
        style: {
          fontSize: '16px',
          color: '#162c50',
          marginLeft: '8px',
        },
      }}
    />
  );

  const IconNews = (
    <MyIcon
      item={{
        lib: 'Feather',
        name: 'FiFileText',
        style: {
          fontSize: '16px',
          color: '#162c50',
          marginLeft: '0px',
          marginRight: '8px',
        },
      }}
    />);


const IconAlerts = (
  <MyIcon
    item={{
      lib: 'Feather',
      name: 'FiAlertTriangle',
      style: {
        fontSize: '16px',
        color: '#162c50',
        marginLeft: '0px',
        marginRight: '8px',
      },
    }}
  />);





  
  const getPageTitle = () => {

  
    
    let name;
    props.routes.map(prop => {
      if (
        matchPath(props.location.pathname, {
          path: prop.path,
          exact: true,
          strict: false
        })
      ) {
        name = prop.name;
      


        

      }
      return null;
    });
    return name;
    
  };


  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);                    
  const {selectType,setSelectType} = useContext(GAppContext);
  const location = useLocation();

  const handleClick = (e) => {
 
 //   console.log(e.currentTarget.detail);
    setAnchor(e.currentTarget);
    setOpen(true);

   
  };


  const handleClose = (e) => {
 
    

    
    if (e.currentTarget.innerText.length > 0)
    {
       setSelectType({'type' : e.currentTarget.innerText});
    }
    setAnchor(null);
    setOpen(false);

  };

  useEffect(() => {
    
   
          if (props.location.pathname.toLowerCase().includes('alerta')) { setSelectType({type: 'Alertas'})}
        if (props.location.pathname.toLowerCase().includes('noticia')) { setSelectType({type: 'Noticias'})}
        
 
  }, [location]);


  return(
    
      <header className="app-header">
      
        <div className="top-nav">

     


          <Navbar className="myNavbar mr-" color="faded" light expand="md">
           
          <div className="site-logo-bar">
          <div className="navbar-brand m-0 p-0">
            {props.logo && <img src={props.logo} alt="" />}
         
          </div>
        </div>
        
          
           
            <Button id="selectTypeButton" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
   {selectType.type} {IconSelect}
      </Button>
|  {getPageTitle()}
      <Menu
         
        id="selectTypeMenu"
        anchorEl={anchor}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to='/gestor/n/noticias'>{IconNews}Noticias</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to='/gestor/a/alertas'>{IconAlerts}Alertas</MenuItem>
      
      </Menu>


          </Navbar>
        </div>
      </header>
    );
  
}


export default Header;

