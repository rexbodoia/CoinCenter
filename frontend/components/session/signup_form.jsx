import React from 'react';
import { merge } from 'lodash';
import { withRouter, Link, Redirect } from 'react-router-dom';
import SignupHeader from './signup_header';

class SignupForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      f_name: '',
      l_name: '',
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.errors = this.errors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
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

  errors() {
    if(this.props.errors.length !== 0) {
      return (
        <ul className='errors'>
          {/* <span className='x-button' onClick={this.clearErrors}>x</span> */}
          {this.props.errors.map((error, idx) => {
            if(error === "F name can't be blank"){
              error = "First name can't be blank";
            } else if (error === "L name can't be blank") {
              error = "Last name can't be blank";
            } else if (error === "Password is too short (minimum is 8 characters)") {
              error = "Password is too short";
            }
            if (idx === 0) {
              return <li key={idx}>{error}<span className='x-button' onClick={this.clearErrors}>x</span></li>
            } else {
              return <li key={idx}>{error}</li>
            }
          })}
        </ul>
      );
    }
  }

  clearErrors(e) {
    e.preventDefault();
    this.props.clearErrors();
  }

  update(field){
    return (e) => {
      this.setState({[field]: e.target.value});
    }
  }

  render () {
    return (
      <div>
        <SignupHeader history={this.props.history}/>

        {this.errors()}
        <div className='auth-container'>
          <div>
            <h1 className='signup-form-header'>Create your account</h1>

            <form onSubmit={this.handleSubmit} className='signup-form'>
              <h1 className='form-header first-name-header'>First Name</h1>
              <h1 className='form-header last-name-header'>Last Name</h1>

              <div className='name-container signup-input-container'>
                <input type='text' onChange={this.update('f_name')} placeholder='First Name' className='first-name-input signup-input'></input>

                <input type='text' onChange={this.update('l_name')} placeholder='Last Name' className='last-name-input signup-input'></input>
              </div>

              <div className='signup-input-container'>
                <h1 className='form-header'>Email</h1>
                <input type='email' onChange={this.update('email')} placeholder='Your email address' className='signup-input'></input>
              </div>

              <div className='signup-input-container'>
                <h1 className='form-header'>Password</h1>
                <input type='password' onChange={this.update('password')} placeholder='Choose a password' className='signup-input'></input>
              </div>

              <input type='submit' value='Create account' className='signup-button'></input>

              <input onClick={this.handleDemo} type='submit' className='signup-demo-button' value='Demo login'></input>
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
