import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SigninHeader extends React.Component {
  constructor(props) {
    super(props)
    this.signupRedirect = this.signupRedirect.bind(this);
    this.splashRedirect = this.splashRedirect.bind(this);
  }

  signupRedirect() {
    this.props.history.push('/signup');
  }

  splashRedirect(e) {
    e.preventDefault();
    this.props.history.push('/');
  }

  render () {
    return (
      <div className='signin-header'>

        <span onClick={this.splashRedirect} className='homepage-link'>
          <h1 className='logo'>coincenter</h1>
        </span>

        <div className='signin-nav-links-container'>
          <span className='signin-same-link' onClick={(e) => e.preventDefault()}>Sign In</span>

          <span className='signin-other-button' onClick={() => this.signupRedirect()}>Sign Up</span>
        </div>
      </div>
    );
  }
}

export default SigninHeader;
