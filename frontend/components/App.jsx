import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/auth_route_util';
import { ProtectedRoute } from '../util/protected_route_util';
import AuthFormsContainer from './session/auth_forms_container';
import NavHeaderContainer from './default/nav_header_container';
import NavHeader from './default/nav_header';

const App = () => (
  <div>
    <AuthRoute path='/signin' component={AuthFormsContainer} />
    <AuthRoute path='/signup' component={AuthFormsContainer} />
    <ProtectedRoute path='/' exact component={NavHeaderContainer} />
  </div>
);

export default App;
