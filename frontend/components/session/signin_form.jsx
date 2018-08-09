import React from 'react';
import { merge } from 'lodash';
import { withRouter, Link, Redirect } from 'react-router-dom';
import SigninHeader from './signin_header';

class SigninForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.processForm(user);
  }

  handleDemo(e) {
    e.preventDefault();
    const user = {
      f_name: 'guest',
      l_name: 'user',
      email: 'guest@user.com',
      password: '123456'
    }
    this.props.demoLogin(user);
  }

  update(field){
    return (e) => {
      this.setState({[field]: e.target.value});
    }
  }

  render () {
    return (
      <div>
        <SigninHeader history={this.props.history} />
        <div className='auth-container'>
          <div>
            <h1 className='signin-form-header'>Sign in to Coincenter</h1>

            <form onSubmit={this.handleSubmit} className='signin-form'>
              <div className='signin-input-container'>
                <input type='email' placeholder='Email' onChange={this.update('email')} className='signin-input'></input>
              </div>

              <div className='signin-input-container'>
                <input type='password' placeholder='Password' onChange={this.update('password')} className='signin-input'></input>
              </div>

              <input className='signin-button' type='submit' value='Sign In'></input>

              <input onClick={this.handleDemo} type='submit' className='signin-demo-button' value='Demo login'></input>
            </form>

            <div className='no-account-container'>
              <Link to='/signup' className='no-account'>Don't have an account?</Link>
            </div>

            <ul>
              {this.props.errors.map(error => {
                <li>{error}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SigninForm);
