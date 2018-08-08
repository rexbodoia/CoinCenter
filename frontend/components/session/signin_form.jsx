import React from 'react';
import { merge } from 'lodash';
import { withRouter, Link, Redirect } from 'react-router-dom';

class SigninForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
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
          <h1 className='signin-header'>Sign in to Coincenter</h1>

          <form onSubmit={this.handleSubmit} className='signin-form'>

            <div className='signin-input-container'>
              <input type='email' placeholder='Email' onChange={this.update('email')} className='signin-input'></input>
            </div>

            <div className='signin-input-container'>
              <input type='password' placeholder='Password' onChange={this.update('password')} className='signin-input'></input>
            </div>

            <input type='submit' value='Sign In'></input>
          </form>

          <Link to='/signup'>Sign Up</Link>

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

export default withRouter(SigninForm);
