import React, { useState, useContext, useEffect } from 'react';

import { Navbar } from 'reactstrap';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { GAppContext } from '../../../context/GAppContext';
import { matchPath, Link, useLocation, useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
    />
  );

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
    />
  );

  const IconPa = (
    <MyIcon
      item={{
        lib: 'Fa',
        name: 'FaPills',
        style: {
          fontSize: '16px',
          color: '#162c50',
          marginLeft: '0px',
          marginRight: '8px',
        },
      }}
    />
  );

  const getPageTitle = () => {
    let name;
    props.routes.map((prop) => {
      if (
        matchPath(props.location.pathname, {
          path: prop.path,
          exact: true,
          strict: false,
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
  const { selectType, setSelectType } = useContext(GAppContext);
  const location = useLocation();

  const handleClick = (e) => {
    //   console.log(e.currentTarget.detail);
    setAnchor(e.currentTarget);
    setOpen(true);
  };

  const handleClose = (e) => {
    if (e.currentTarget.innerText.length > 0) {
      let mode = e.currentTarget.innerText;

      setSelectType({ type: mode });
    }
    setAnchor(null);
    setOpen(false);
  };

  const history = useHistory();

  const navigateToViewer = () => {
    if (props.location.pathname.toLowerCase().includes('alerta')) {
      history.push('/gestor/a/alertas');
    }

    if (props.location.pathname.toLowerCase().includes('noticia')) {
      history.push('/gestor/n/noticias');
    }
    if (props.location.pathname.toLowerCase().includes('pactivo')) {
      history.push('/gestor/p/pactivos');
    }
  };

  useEffect(() => {
    if (props.location.pathname.toLowerCase().includes('alertas')) {
      setSelectType({ type: 'Alertas' });
    }
    if (props.location.pathname.toLowerCase().includes('noticias')) {
      setSelectType({ type: 'Noticias' });
    }
    if (props.location.pathname.toLowerCase().includes('pactivos')) {
      setSelectType({ type: 'P. Activos' });
    }
  }, [location]);

  return (
    <header className="app-header">
      <div className="top-nav d-flex w-100" style={{ height: '38px' }}>
        <Navbar className="myNavbar float-left " color="faded" style={{ width: 'calc(100% - 35px)' }} light expand="md">
          <IconButton onClick={history.goBack} aria-label="delete" className="p-0 m-0 mr-1">
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
          <div className="site-logo-bar" onClick={navigateToViewer}>
            <div className="navbar-brand m-0 p-0">{props.logo && <img src={props.logo} alt="" />}</div>
          </div>
          <IconButton onClick={history.goForward} aria-label="delete" className="p-0 m-0 ml-1 mr-4">
            <ChevronRightIcon fontSize="large" />
          </IconButton>
          <Button id="selectTypeButton" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            {selectType.type} {IconSelect}
          </Button>
          <div id="appTitular">{getPageTitle()}</div>
          <Menu
            id="selectTypeMenu"
            anchorEl={anchor}
            keepMounted
            onChange={(e) => {
              console.log(e);
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/gestor/n/noticias">
              {IconNews}Noticias
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/gestor/a/alertas">
              {IconAlerts}Alertas
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/gestor/p/pactivos">
              {IconPa}P. Activos
            </MenuItem>
          </Menu>
        </Navbar>

        <IconButton
          onClick={(e) => {
            localStorage.clear();
            history.push('/');
          }}
          aria-label="delete"
          className="p-0 m-0 float-right"
          style={{ color: '#fff', background: '#162c50', borderRadius: '0px', height: '40px', width: '35px' }}
        >
          <ExitToAppIcon fontSize="large" />
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
