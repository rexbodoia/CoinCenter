import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import HomePage from './default/home_page';
import SigninFormContainer from './session/signin_form_container';
import SignupFormContainer from './session/signup_form_container';
import NavHeader from './default/nav_header';
import SigninHeader from './session/signin_header';
import SignupHeader from './session/signup_header';

const App = () => (
  <div>
    {/* <h1 className='logo'>coincenter</h1> */}
    {/* <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/' component={NavHeader} />
    </Switch> */}
    <AuthRoute path='/signin' component={SigninHeader} />
    <AuthRoute path='/signup' component={SignupHeader} />
    <AuthRoute path='/signin' component={SigninFormContainer} />
    <AuthRoute path='/signup' component={SignupFormContainer} />
  </div>
);

export default App;
