import React, { useEffect, useState, useContext, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { FormContext } from '../../../../context/FormContext';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const ImgBank = ({ idImagen, relaImg, banco, categoria, keyword, indicaciones }) => {
  const initialIndication = () => {
    let idx = 0;

    indicaciones.map((v) => {
      if (relaImg['img_indicacion'][v.indicacion] === idImagen) {
        idx = v.indicacion;
      }

      if (relaImg['img_indicacion'][v.id] === idImagen) {
        idx = v.id;
      }
    });

    return idx;
  };

  const initialImg = () => {
    let obj = { id: 0, img: '' };

    indicaciones.map((v) => {
      if (relaImg['img_indicacion'][v.indicacion] === idImagen) {
        obj.id = relaImg['img_indicacion'][v.indicacion];
        obj.img = banco[obj.id];
      }

      if (relaImg['img_indicacion'][v.id] === idImagen) {
        obj.id = relaImg['img_indicacion'][v.id];
        obj.img = banco[obj.id];
      }
    });

    return obj;
  };

  const { changeFields, setChangefields } = useContext(FormContext);

  const [imgCat, setImgCat] = useState({ id: 0, img: '' });
  const [imgKey, setImgKey] = useState({ id: 0, img: '' });
  const [imgInd, setImgInd] = useState(initialImg());
  const [imgActive, setImgActive] = useState(idImagen);
  const [selectInd, setSelectInd] = useState(initialIndication());

  const useStyles = makeStyles((theme) => ({
    imgNot: {
      border: '1px solid #b4b4b4',
      borderRadius: '0.25rem',
    },
    select: {
      width: '100%',
      background: '#fff !important',
      border: '1px solid #b4b5b5',
      borderRadius: '0.35rem',
      marginBottom: '4px',

      '&::before': {
        border: '0px solid',
        display: 'none',
      },

      '& .MuiSelect-selectMenu': {
        marginLeft: '8px',
      },

      '&::after': {
        border: '0px solid',
        display: 'none',
      },
    },
  }));

  const classes = useStyles();

  const imgIndications = () => {
    let data = [];

    indicaciones.map((v) => {
      let elem = {};
      if (relaImg['img_indicacion'][v.indicacion] > 0) {
        elem.indicacion = v.indicacion;
        elem.nombre = v.nombre;
      }

      if (relaImg['img_indicacion'][v.id] > 0) {
        elem.indicacion = v.id;
        elem.nombre = v.nombre;
      }

      if (Object.keys(elem).length > 0) data.push(elem);
    });

    return data;
  };

  let imgs_indicacion = imgIndications();

  useEffect(() => {
    if (categoria === undefined || categoria === null) categoria = { value: '0', label: '-' };
    if (keyword === undefined || keyword === null) keyword = { value: '0', label: '-' };

    const keys_categoria = Array.from(relaImg['img_categoria'].keys());
    const keys_palabra = Array.from(relaImg['img_palabra'].keys());

    if (parseInt(categoria.value) > 0 && keys_categoria.includes(parseInt(categoria.value))) {
      let id_img = relaImg['img_categoria'][categoria.value];

      if (id_img !== undefined) setImgCat({ id: id_img, img: banco[id_img] });
      else setImgCat({ id: 0, img: '' });
    } else setImgCat({ id: 0, img: '' });

    if (parseInt(keyword.value) > 0 && keys_palabra.includes(parseInt(keyword.value))) {
      let id_img = relaImg['img_palabra'][keyword.value];

      if (id_img !== undefined) setImgKey({ id: id_img, img: banco[id_img] });
      else setImgKey({ id: 0, img: '' });
    } else setImgKey({ id: 0, img: '' });

    imgs_indicacion = imgIndications();
  }, [categoria, keyword, indicaciones]);

  return (
    <div className="EditorFormPage m-0 p-1 ml-2">
      {(imgCat.img !== undefined && imgCat.img.length > 0) || (imgKey.img !== undefined && imgKey.img.length > 0) ? (
        <Fragment>
          <label>Banco de imagenes:</label>
          <Grid container className="mt-2">
            {imgCat.img.length > 0 ? (
              <Grid container item xs={12} md={6} className="p-1">
                <img
                  className={classes.imgNot}
                  src={`https://static.vademecum.es/documentos/banco_imagenes_noticias/${imgCat.img}`}
                />
                <div className="toggle-container mt-1">
                  <Toggle
                    checked={imgCat.id === imgActive}
                    onChange={(e) => {
                      let cf = { ...changeFields };
                      cf['id_imagen'] = imgCat.id;
                      setChangefields(cf);
                      setImgActive(imgCat.id);
                    }}
                  />
                  <label>Categoria</label>
                </div>
              </Grid>
            ) : null}

            {imgKey.img.length > 0 ? (
              <Grid container item xs={12} md={6} className="p-1">
                <img
                  className={classes.imgNot}
                  src={`https://static.vademecum.es/documentos/banco_imagenes_noticias/${imgKey.img}`}
                />
                <div className="toggle-container mt-1">
                  <Toggle
                    checked={imgKey.id === imgActive}
                    onChange={(e) => {
                      let cf = { ...changeFields };
                      cf['id_imagen'] = imgKey.id;
                      setChangefields(cf);
                      setImgActive(imgKey.id);
                    }}
                  />
                  <label>Palabra</label>
                </div>
              </Grid>
            ) : null}

            {imgs_indicacion.length > 0 ? (
              <Grid container item xs={12} md={6} className="p-1">
                {imgInd.id !== 0 ? (
                  <img
                    className={classes.imgNot}
                    src={`https://static.vademecum.es/documentos/banco_imagenes_noticias/${imgInd.img}`}
                  />
                ) : (
                  <img
                    className={classes.imgNot}
                    src={`https://static.vademecum.es/documentos/banco_imagenes_noticias/${
                      banco[relaImg['img_indicacion'][imgs_indicacion[0].indicacion]]
                    }`}
                  />
                )}

                <div className="toggle-container mt-1">
                  {imgs_indicacion.length > 1 ? (
                    <div>
                      <Select
                        className={classes.select}
                        value={selectInd === 0 ? imgs_indicacion[0].indicacion : selectInd}
                        id="demo-customized-select-native"
                        onChange={(e) => {
                          let id_img = relaImg['img_indicacion'][e.target.value];
                          setSelectInd(e.target.value);
                          setImgInd({ id: id_img, img: banco[id_img] });
                        }}
                      >
                        {imgs_indicacion.map((v) => (
                          <MenuItem value={v.indicacion}>{v.nombre}</MenuItem>
                        ))}
                      </Select>
                    </div>
                  ) : null}

                  <Toggle
                    checked={
                      imgInd.id === 0
                        ? relaImg['img_indicacion'][imgs_indicacion[0].indicacion] === imgActive
                        : imgInd.id === imgActive
                    }
                    onChange={(e) => {
                      let cf = { ...changeFields };

                      if (imgInd.id === 0) {
                        let id_img = relaImg['img_indicacion'][imgs_indicacion[0].indicacion];
                        setImgInd({ id: id_img, img: banco[id_img] });
                      }

                      cf['id_imagen'] = imgInd.id;
                      setChangefields(cf);
                      setImgActive(imgInd.id);
                    }}
                  />

                  <label>Enfermedad</label>
                </div>
              </Grid>
            ) : null}
          </Grid>
        </Fragment>
      ) : null}
    </div>
  );
};

export default ImgBank;
