import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import MyDashboardLayout from './layouts/MyDashboardLayout';
import PrivateRoute from './layouts/PrivateRoute';
import Login from './views/pages/Login';
import './created/scss/styles.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/gestor/login'} component={Login} key={'login'} />
        <PrivateRoute path="/gestor" component={MyDashboardLayout} />
        <Redirect from="/" to="/gestor/n/noticias" />
      </Switch>
    </BrowserRouter>
  );
}
