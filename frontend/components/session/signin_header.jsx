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
          <Link className='signin-same-link' to='/signin'>Sign In</Link>

          <button className='signin-other-button' onClick={() => this.signupRedirect()}>Sign Up</button>
        </div>
      </div>
    );
  }
}

export default SigninHeader;
