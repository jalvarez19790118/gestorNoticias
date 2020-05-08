import React from 'react';
import { IconContext } from "react-icons";
import * as Bs from "react-icons/bs";  //BootStrap
import * as Feather from "react-icons/fi"; //Feather



const MyIcon = ({item}) => {

let Icon = null;
if (item.lib === 'Feather') Icon = Feather[item.name];
if (item.lib === 'Bs') Icon = Bs[item.name];
if (Icon === null) return null;

    return ( 
        
    <IconContext.Provider value={{ style:  item.style }}>
        <Icon />
    </IconContext.Provider>

     );
}
 
export default MyIcon;