import React from 'react';
import { merge } from 'lodash';
import { withRouter, Link, Redirect } from 'react-router-dom';

class SigninForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.processForm(user).then(() => this.props.history.push('/'));
  }

  update(field){
    return (e) => {
      this.setState({[field]: e.target.value});
    }
  }

  render () {
    // if(currentUser){
    //   <Redirect to="/"/>
    // }
    return (
      <div>
        <h1>Sign In</h1>

        <form onSubmit={this.handleSubmit}>

          <label>Username:
            <input type='text' onChange={this.update('username')}></input>
          </label>

          <label>Password:
            <input type='password' onChange={this.update('password')}></input>
          </label>

          <input type='submit' value='Sign In'></input>
        </form>

        <Link to='/signup'>Sign Up</Link>

        <ul>
          {this.props.errors.map(error => {
            <li>{error}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(SigninForm);
