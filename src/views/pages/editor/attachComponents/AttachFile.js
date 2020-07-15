import React, { useContext, Fragment } from 'react';
//import { useState } from 'react';
//import clienteAxios from '../../../../config/axios';
import { FormContext } from '../../../../context/FormContext';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  boton: {
    background: '#162c50',
    color: '#fff',
    borderRadius: '0.2rem',
    fontSize: '12px',
    fontWeight: 'bold',

    '&:hover': {
      background: '#162c50',
      color: '#fff',
    },
  },
}));

const AttachFile = () => {
  const { attached, setAttached } = useContext(FormContext);
  const classes = useStyles();

  const onChange = (e) => {
    //  setAttached(e.target.files[0]);

    let files = e.target.files;
    let a_new = [...attached];

    Array.from(files).forEach((file) => {
      file.desc = '';
      a_new.push(file);
    });

    console.log(a_new);
    setAttached(a_new);
  };

  return (
    <Fragment>
      <div className="mx-0 my-2 p-0 w-100 text-center">
        <input id="inputFiles" className={classes.input} type="file" value={''} onChange={onChange} multiple />
        <label htmlFor="inputFiles">
          <IconButton className={classes.boton} aria-label="upload picture" component="span">
            <CloudUploadIcon fontSize="small" className="mr-2" /> Subir ficheros
          </IconButton>
        </label>
      </div>
      <ul>
        {attached.map((elem) => (
          <li>{elem.name}</li>
        ))}
      </ul>
    </Fragment>
  );
};

export default AttachFile;
