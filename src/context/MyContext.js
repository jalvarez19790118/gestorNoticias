import React, { createContext , useState} from 'react';


export const MyContext = createContext();


const MyProvider = (props) => {

   const [hola, setHola] = useState('');


   return (

    <MyContext.Provider value={{

        hola,
        setHola
    }}>
        {props.children}
    </MyContext.Provider>
   )

}


export default MyProvider;