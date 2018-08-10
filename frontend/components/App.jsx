import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/auth_route_util';
import { ProtectedRoute } from '../util/protected_route_util';
import AuthFormsContainer from './session/auth_forms_container';
import NavHeaderContainer from './default/nav_header_container';
import NavHeader from './default/nav_header';
import SignedIn from './default/signed_in';
import SplashPage from './default/splash_page';

const App = () => (
  <div>
    <AuthRoute path='/signin' component={AuthFormsContainer} />
    <AuthRoute path='/signup' component={AuthFormsContainer} />
    <AuthRoute path='/' exact component={SplashPage} />
    <Switch>
      <ProtectedRoute path='/dashboard' component={SignedIn} />
    </Switch>
  </div>
);

export default App;
