import React, { createContext, useState } from 'react';

export const GAppContext = createContext();

const GAppProvider = (props) => {
  let aDate = new Date();

  let dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
  let [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(aDate);

  const [selectType, setSelectType] = useState({ type: 'Noticias' });

  let [{ value: month1 }, , { value: day1 }, , { value: year1 }] = dateTimeFormat.formatToParts(
    aDate.setMonth(aDate.getMonth() - 1)
  );
  const [dateIni, setDateIni] = useState(`${year1}-${month1}-${day1}`);
  const [dateFin, setDateFin] = useState(`${year}-${month}-${day}`);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  return (
    <GAppContext.Provider
      value={{
        selectType,
        setSelectType,
        dateFin,
        dateIni,
        page,
        perPage,
        setDateIni,
        setDateFin,
        setPage,
        setPerPage,
      }}
    >
      {props.children}
    </GAppContext.Provider>
  );
};

export default GAppProvider;
