import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/auth_route_util';
import { ProtectedRoute } from '../util/protected_route_util';
import AuthFormsContainer from './session/auth_forms_container';
import SignedIn from './signed_in/signed_in';
import SplashPageContainer from './splash/splash_page_container';

const App = () => (
  <div>
    <Switch>
      <AuthRoute path='/signin' component={AuthFormsContainer} />
      <AuthRoute path='/signup' component={AuthFormsContainer} />
      <AuthRoute path='/' exact component={SplashPageContainer} />
      <ProtectedRoute path='/' component={SignedIn} />
    </Switch>
  </div>
);

export default App;
