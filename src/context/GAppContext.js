import React, { createContext, useState } from 'react';


export const GAppContext = createContext();

const GAppProvider = (props) => {

  let aDate = new Date();
  let dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
  let [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(aDate);


  const [selectType, setSelectType] = useState({'type':'Noticias'});
  const [selectGDate, setSelectGDate] = useState(`${year}-${month}-${day}`);

  return (
    <GAppContext.Provider
      value={{
        selectType,
        setSelectType,
        selectGDate,
        setSelectGDate
      }}
    >
      {props.children}
    </GAppContext.Provider>
  );
};

export default GAppProvider;
