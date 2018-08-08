import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import HomePage from './default/home_page';
import SigninFormContainer from './session/signin_form_container';
import SignupFormContainer from './session/signup_form_container';
import NavHeader from './default/nav_header';

const App = () => (
  <div>
    <h1>CoinCenter</h1>
    {/* <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/' component={NavHeader} />
    </Switch> */}
    <AuthRoute path='/signin' component={SigninFormContainer} />
    <AuthRoute path='/signup' component={SignupFormContainer} />
  </div>
);

export default App;
