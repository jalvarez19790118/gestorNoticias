import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
  const estaAutenticado = () => {
    let hours = 1;
    let saved = localStorage.getItem('setupTime');
    if (saved && new Date().getTime() - saved > hours * 60 * 60 * 1000) {
      localStorage.clear();
    }

    let jwt = localStorage.getItem('jwt');

    return jwt !== null && jwt.length > 0;
  };

  return (
    <Route
      {...props}
      render={(props) => (!estaAutenticado() ? <Redirect to="/gestor/login" /> : <Component {...props} />)}
    />
  );
};

export default PrivateRoute;
