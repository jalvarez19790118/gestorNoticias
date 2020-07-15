import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles(() => ({
 parent: {
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     height: '100vh',
     width: '100%'

    },

  card: {
      border: '2px solid #162c50',
      borderRadius: '0.35rem',
      width: '120px',
      height: '100px',
      marging: '8px',
    },
    
    top: {
        color: '#162c50',
        animationDuration: '550ms',
     
      },

    label: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '5px',
        marginBottom: '5px',
        color: '#162c50',
    }

}));


const LoadingCard = () => {

    const classes = useStyles();
    
    
    return (
        <div className={classes.parent}> 
<Card className={classes.card}>
      <CardContent className='text-center'>

      <CircularProgress
        variant="indeterminate"
        size={45}
        disableShrink
        thickness={4}
        className={classes.top}
     
       
      />
<div className={classes.label}>Buscando</div>
      </CardContent>
      </Card>

    </div>

    );

}

export default LoadingCard;