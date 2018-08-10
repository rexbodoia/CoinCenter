import React from 'react';
import { merge } from 'lodash';
import { withRouter, Link, Redirect } from 'react-router-dom';
import SignupHeader from './signup_header';
import AuthErrors from './auth_errors';
import SigninForm from './signin_form';
import SignupForm from './signup_form';

class AuthForms extends React.Component {
  constructor(props){
    super(props);

    if (props.location.pathname === '/signup') {
      this.state = {
        f_name: '',
        l_name: '',
        email: '',
        password: ''
      };
    } else {
      this.state = {
        email: '',
        password: ''
      };
    }

    this.pathname = props.location.pathname
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.errors = this.errors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundColor = '#0667d0';
  }

  componentWillUnmount(){
    this.props.clearErrors();
    document.body.style.backgroundColor = null;
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    if (this.pathname === '/signup')  {
      this.props.signup(user);
    } else {
      this.props.signin(user);
    }
  }

  handleDemo(e) {
    e.preventDefault();
    const user = {
      f_name: 'guest',
      l_name: 'user',
      email: 'guest@user.com',
      password: '12345678'
    }
    this.props.demoLogin(user);
  }

  errors() {
    if(this.props.errors.length !== 0) {
      return (
        <AuthErrors errors={this.props.errors} clearErrors={this.clearErrors}/>
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

  showComponent() {
    if (this.pathname === '/signup') {
      return (
        <SignupForm handleSubmit={this.handleSubmit} update={this.update} handleDemo={this.handleDemo} errors={this.errors}/>
      );
    } else {
      return (
        <SigninForm handleSubmit={this.handleSubmit} update={this.update} handleDemo={this.handleDemo} errors={this.errors}/>
      );
    }
  }

  render () {
    return (
      <div className='auth-body'>
        {this.showComponent()}
      </div>
    );
  }
}

export default withRouter(AuthForms);