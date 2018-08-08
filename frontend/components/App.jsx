import React from 'react';
import { Route } from 'react-router-dom';
import SigninFormContainer from './session/signin_form_container';
import SignupFormContainer from './session/signup_form_container';

const App = () => (
  <div>
    <h1>CoinCenter</h1>
    <Route path='/signin' component={SigninFormContainer} />
    <Route path='/signup' component={SignupFormContainer} />
  </div>
);

export default App;
