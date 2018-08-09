import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SigninHeader extends React.Component {
  constructor(props) {
    super(props)
    this.signupRedirect = this.signupRedirect.bind(this);
  }

  signupRedirect() {
    this.props.history.push('/signup');
  };

  render () {
    return (
      <div className='signin-header'>
        <h1 className='logo'>coincenter</h1>

        <div className='signin-nav-links-container'>
          <span className='signin-same-link' onClick={(e) => e.preventDefault()}>Sign In</span>

          <span className='signin-other-button' onClick={() => this.signupRedirect()}>Sign Up</span>
        </div>
      </div>
    );
  }
}

export default SigninHeader;
