import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import SigninHeader from './signin_header';

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <SigninHeader history={this.props.history} />

        {this.props.errors()}
        <div className='auth-container'>
          <div>
            <h1 className='signin-form-header'>Sign in to Coincenter</h1>

            <form onSubmit={this.props.handleSubmit} className='signin-form'>
              <div className='signin-input-container'>
                <input type='email' placeholder='Email' onChange={this.props.update('email')} className='signin-input'></input>
              </div>

              <div className='signin-input-container'>
                <input type='password' placeholder='Password' onChange={this.props.update('password')} className='signin-input'></input>
              </div>

              <input className='signin-button' type='submit' value='Sign In'></input>

              <input onClick={this.props.handleDemo} type='submit' className='signin-demo-button' value='Demo login'></input>
            </form>

            <div className='no-account-container'>
              <Link to='/signup' className='no-account'>Don't have an account?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SigninForm);
