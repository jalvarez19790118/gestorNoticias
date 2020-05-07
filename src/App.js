import React from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MyDashboardLayout from './layouts/MyDashboardLayout';
import './vibe/scss/styles.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/demo" component={DashboardLayout} />
        <Route path="/gestor" component={MyDashboardLayout} />
        <Redirect from="/" to="/gestor"/>
        
      </Switch>
    </BrowserRouter>
  );
}
