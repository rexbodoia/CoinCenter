import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import SignupHeader from './signup_header';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <SignupHeader history={this.props.history} />

        {this.props.errors()}
        <div className='auth-container'>
          <div>
            <h1 className='signup-form-header'>Create your account</h1>

            <form onSubmit={this.props.handleSubmit} className='signup-form'>
              <h1 className='form-header first-name-header'>First Name</h1>
              <h1 className='form-header last-name-header'>Last Name</h1>

              <div className='name-container signup-input-container'>
                <input type='text' onChange={this.props.update('f_name')} placeholder='First Name' className='first-name-input signup-input'></input>

                <input type='text' onChange={this.props.update('l_name')} placeholder='Last Name' className='last-name-input signup-input'></input>
              </div>

              <div className='signup-input-container'>
                <h1 className='form-header'>Email</h1>
                <input type='email' onChange={this.props.update('email')} placeholder='Your email address' className='signup-input'></input>
              </div>

              <div className='signup-input-container'>
                <h1 className='form-header'>Password</h1>
                <input type='password' onChange={this.props.update('password')} placeholder='Choose a password' className='signup-input'></input>
              </div>

              <input type='submit' value='Create account' className='signup-button'></input>

              <input onClick={this.props.handleDemo} type='submit' className='signup-demo-button' value='Demo login'></input>
            </form>

            <div className='have-account'>
              <h1>Already have a Coincenter account?</h1>
              <Link className='login-link' to='/signin'>Log in</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
