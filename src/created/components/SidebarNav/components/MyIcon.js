import React from 'react';
import { IconContext } from "react-icons";
import * as Bs from "react-icons/bs";  //BootStrap
import * as Feather from "react-icons/fi"; //Feather
import * as FontAwesome from "react-icons/fa"; //FontAwesome
import * as Grommet from "react-icons/gr"; //
import * as AntDesignIcons from "react-icons/ai";


const MyIcon = ({item}) => {

let Icon = null;
if (item.lib === 'Feather') Icon = Feather[item.name];
if (item.lib === 'Bs') Icon = Bs[item.name];
if (item.lib === 'Fa') Icon = FontAwesome[item.name];
if (item.lib === 'Grommet') Icon = Grommet[item.name];
if (item.lib === 'Ai') Icon = AntDesignIcons[item.name];
if (Icon === null) return null;

    return ( 
        
    <IconContext.Provider  value={{ style:  item.style }}>
        <Icon className={item.class}/>
    </IconContext.Provider>

     );
}
 
export default MyIcon;