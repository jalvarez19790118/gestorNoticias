import React from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';

import MyDashboardLayout from './layouts/MyDashboardLayout';
import './created/scss/styles.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/gestor" component={MyDashboardLayout} />
        <Redirect from="/" to="/gestor"/>
        
      </Switch>
    </BrowserRouter>
  );
}
