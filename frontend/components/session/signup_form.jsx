import React from 'react';
import { merge } from 'lodash';
import { withRouter, Link, Redirect } from 'react-router-dom';

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
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.processForm(user);
  }

  update(field){
    return (e) => {
      this.setState({[field]: e.target.value});
    }
  }

  render () {
    return (
      <div className='auth-container'>
        <div>
          <h1 className='auth-header'>Create your account</h1>

          <form onSubmit={this.handleSubmit} className='auth-form'>

            <div className='name-container'>
              <input type='text' onChange={this.update('f_name')} placeholder='First Name' className='first-name'></input>

              <input type='text' onChange={this.update('l_name')} placeholder='Last Name' className='last-name'></input>
            </div>
            <br/>

            <input type='email' onChange={this.update('email')} placeholder='Email'></input>
            <br/>

            <input type='password' onChange={this.update('password')} placeholder='Choose a password'></input>
            <br/>

            <input type='submit' value='Create account'></input>
          </form>

          <Link to='/signin'>Sign In</Link>

          <ul>
            {this.props.errors.map(error => {
              <li>{error}</li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
