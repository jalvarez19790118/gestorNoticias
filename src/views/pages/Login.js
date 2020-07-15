import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    height: '100vh',
  },
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: 'auto',
    border: '1px solid #162c50',
  },
  CardActions: {
    background: '#162c50',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  userform: {
    marginBottom: '20px',
    background: '#fff',

    '& input': {
      background: '#fff',
      backgroundColor: '#fff',
    },
  },

  button: {
    background: '#162c50',
    textTransform: 'unset',
    color: '#fff',

    '&:hover': {
      background: '#162c50',
      textTransform: 'unset',
    },
  },

  adorment: {
    backgroundColor: '#fff',
    color: '#162c50',
  },
});

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    window.addEventListener('keyup', (event) => {
      event.preventDefault();

      if (event.keyCode === 13) {
        doLogin();
      }
    });
  });


  useEffect(() => {
    if (localStorage.getItem('jwt').length > 0)   localStorage.clear();
  },[values]);

  const [values, setValues] = useState({
    user: '',
    pass: '',
  });

  const [error, setError] = useState(false);

  const doLogin = () => {
    sessionStorage.clear();
    let baseURL = process.env.REACT_APP_BACKEND_URL;
    axios.post(`${baseURL}/getJWT`, values).then((resp) => {
      if (resp.data.success == true) {
        setError(false);
        var now = new Date().getTime();
        localStorage.setItem('setupTime', now);
        localStorage.setItem('jwt', resp.data.jwt);
        setTimeout(() => {
          history.push('/gestor/n/noticias');
        }, 300);
      } else {

        sessionStorage.clear();
        setError(true);
        setValues({
          user: '',
          pass: '',
        });
      }
    });
  };

  const handleChange = (prop) => (event) => {
    setError(false);
    setValues({ ...values, [prop]: event.target.value });
  };

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className={classes.container}>
      <Card className={classes.root}>
        <CardActions className={classes.CardActions}>Login</CardActions>
        <CardContent>
          <div className="mb-1"></div>
          <FormControl fullWidth variant="outlined" className={classes.userform}>
            <InputLabel htmlFor="filled-adornment-user">Usuario</InputLabel>
            <FilledInput id="filled-adornment-user" type={'text'} value={values.user} onChange={handleChange('user')} />
          </FormControl>

          <FormControl fullWidth variant="outlined" className={classes.userform}>
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={'password'}
              value={values.pass}
              onChange={handleChange('pass')}
            />
          </FormControl>

          {error ? (
            <div className="text-center text-danger" style={{ fontWeight: 'bold', fontSize: '12px' }}>
              Usuario/Password Incorrectos!!!!
            </div>
          ) : null}

          <div className="text-center mt-2">
            <Button className={classes.button} onClick={doLogin}>
              Aceptar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
