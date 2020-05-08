import React from 'react';

import ScrollContainer from "react-indiana-drag-scroll";

import 'pure-react-carousel/dist/react-carousel.es.css';

import MyNoticiaCard from './MyNoticiaCard';

const MyNoticiasSlider = ({items,setSelected}) => {

 
    return (

      
                    <ScrollContainer
                        style={{
                        'maxHeight': 'calc(100vh - 90px)',
                        'overflow': 'auto',
                        'cursor': 'n-resize'
                    }}>
                        {items.map((item, idx) => {
                            return <div  key={item.id_act_not} onClick={e=>setSelected(item)}><MyNoticiaCard item={item}/></div>
                        })}
                    </ScrollContainer>

              
    );
}

export default MyNoticiasSlider;