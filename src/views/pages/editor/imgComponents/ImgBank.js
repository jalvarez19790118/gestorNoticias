import React, {useEffect, useState, useContext, Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { FormContext } from '../../../../context/FormContext';


const ImgBank = ({idImagen,relaImg,banco,categoria, keyword, indicaciones}) => {

    const {changeFields,setChangefields} = useContext(FormContext);


    const [imgCat, setImgCat] =  useState({'id':0, 'img':''});
    const [imgKey, setImgKey] = useState({'id':0, 'img':''});
    const [imgActive, setImgActive] = useState(idImagen);


    const useStyles = makeStyles((theme) => ({
        

      
        

        imgNot: {
        
            border: '1px solid #b4b4b4',
            borderRadius: '0.25rem',
           
         }
        }));

        const classes = useStyles();


    useEffect(() => { 

        
        if (categoria === undefined || categoria === null) categoria = {value: '0', label: '-'};
        if (keyword === undefined || keyword === null ) keyword =  {value: '0', label: '-'};


        const keys_categoria =  Array.from(relaImg['img_categoria'].keys());
        const keys_palabra =  Array.from(relaImg['img_palabra'].keys());
        const keys_indicacion =  Array.from(relaImg['img_indicacion'].keys());




        if ( parseInt(categoria.value) > 0 && keys_categoria.includes(parseInt(categoria.value)))
        {
           let id_img = relaImg['img_categoria'][categoria.value];
         
           if (id_img !== undefined) setImgCat({'id': id_img, 'img' : banco[id_img]});
           else setImgCat({'id':0, 'img':''});
        }
        else setImgCat({'id':0, 'img':''});
        
      
        if ( parseInt(keyword.value) > 0 && keys_palabra.includes(parseInt(keyword.value)))
        {
           let id_img = relaImg['img_palabra'][keyword.value];

           if (id_img !== undefined)  setImgKey({'id': id_img, 'img' : banco[id_img]});
           else setImgKey({'id':0, 'img':''});    
       
          

           
        
       }
       else setImgKey({'id':0, 'img':''});


    }
    
    
    , [categoria,keyword]);



    return (

       
        <div className="EditorFormPage m-0 p-1 ml-2" >
          { (imgCat.img !== undefined &&   imgCat.img.length > 0) || (imgKey.img !== undefined && imgKey.img.length > 0) ?  <Fragment>
      <label>Banco de imagenes:</label>
        <Grid  container className="mt-2">

        {imgCat.img.length > 0 ?  
        <Grid container item xs={12} md={6}  className="p-1" >
          <img  className={classes.imgNot} src={`https://static.vademecum.es/documentos/banco_imagenes_noticias/${imgCat.img}`}/>
          <div className="toggle-container mt-1">
            <Toggle
            
            checked={imgCat.id === imgActive}

            onChange={(e)=>{


                let cf = {...changeFields};
                cf['id_imagen'] = imgCat.id;

                



                setChangefields(cf);
                setImgActive(imgCat.id);
            }}
            />
            <label>Categoria</label>
          </div>
        </Grid>: null }

        {imgKey.img.length > 0 ?  
        <Grid container item xs={12} md={6}  className="p-1" >
          <img  className={classes.imgNot} src={`https://static.vademecum.es/documentos/banco_imagenes_noticias/${imgKey.img}`}/>
          <div className="toggle-container mt-1">
            <Toggle
            checked={imgKey.id === imgActive}
            onChange={(e)=>{

                let cf = {...changeFields};
                cf['id_imagen'] = imgKey.id;
                setChangefields(cf);
                setImgActive(imgKey.id);
            }}

            />
            <label>Palabra</label>
          </div>
        </Grid>: null }
       </Grid></Fragment> : null }
     
     
     
      </div>
    );
}




export default ImgBank;