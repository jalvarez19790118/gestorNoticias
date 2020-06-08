import React, { createContext, useState } from 'react';


export const GAppContext = createContext();

const GAppProvider = (props) => {
  const [selectType, setSelectType] = useState({'type':'Noticias'});
 

  return (
    <GAppContext.Provider
      value={{
        selectType,
        setSelectType
      }}
    >
      {props.children}
    </GAppContext.Provider>
  );
};

export default GAppProvider;
