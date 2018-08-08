import React from 'react';
import { Route } from 'react-router-dom';
import SigninFormContainer from './session/signin_form_container';
import SignupFormContainer from './session/signup_form_container';
import { AuthRoute } from '../util/route_util';

const App = () => (
  <div>
    <h1>CoinCenter</h1>
    <AuthRoute path='/signin' component={SigninFormContainer} />
    <AuthRoute path='/signup' component={SignupFormContainer} />
  </div>
);

export default App;
