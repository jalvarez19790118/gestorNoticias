import React from 'react';
import MyIcon from '../../../../vibe/components/SidebarNav/components/MyIcon';

const styleObj = {
    'fontSize': '16px',
    'cursor': 'pointer'
};

export const IconDelete = <MyIcon
    item={{
    lib: 'Bs',
    name: 'BsFillXCircleFill',
    style: styleObj
}}/>;

export const IconAdd = <MyIcon
    item={{
    lib: 'Bs',
    name: 'BsFillPlusCircleFill',
    style: {
        'fontSize': '16px',
        'color': '#162c50',
        'marginRight': '5px'
    }
}}/>;

export const IconSep = <MyIcon
    item={{
    lib: 'Fa',
    name: 'FiMoreVertical',
    style: {
        'fontSize': '16px',
        'color': '#162c50',
        'marginRight': '5px'
    }
}}/>;



export const IconLoad = <MyIcon
item={{
class: "fa-pulse",
lib: 'Fa',
name: 'FaSpinner',
style: {
    'fontSize' : '16px',
    'color' : '#162c50',
    'marginRight' : '5px'
}
}}/>;

export const IconPDF = <MyIcon
item={{
lib: 'Ai',
name: 'AiOutlineFilePdf',
style: {
    'color': '#162c50',
    'marginRight': '5px',
    'fontSize': '25px'
}
}}/>;


export const IconHTML = <MyIcon
item={{
lib: 'Ai',
name: 'AiOutlineFileText',
style: {
    'color': '#162c50',
    'marginRight': '5px',
    'fontSize': '25px'
}
}}/>;