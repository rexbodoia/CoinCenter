import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/auth_route_util';
import { ProtectedRoute } from '../util/protected_route_util';
import SigninFormContainer from './session/signin_form_container';
import SignupFormContainer from './session/signup_form_container';
import NavHeaderContainer from './default/nav_header_container';
import NavHeader from './default/nav_header';

const App = () => (
  <div>
    {/* <h1 className='logo'>coincenter</h1> */}
    {/* <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/' component={NavHeader} />
    </Switch> */}
    <AuthRoute path='/signin' component={SigninFormContainer} />
    <AuthRoute path='/signup' component={SignupFormContainer} />
    <ProtectedRoute path='/' exact component={NavHeaderContainer} />
  </div>
);

export default App;
