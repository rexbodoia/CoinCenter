import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SignupHeader extends React.Component {
  constructor(props) {
    super(props)
    this.signupRedirect = this.signupRedirect.bind(this);
  }

  signupRedirect(e) {
    e.preventDefault();
    if (this.props.location.pathname === '/') {
      this.props.history.push('/signup');
    }
  }

  render () {
    return (
      <div className='signup-header'>
        <h1 className='logo'>coincenter</h1>

        <div className='nav-links-container'>
          <Link className='signup-other-link' to='/signin'>Log in</Link>

          <span className='signup-same-button' onClick={this.signupRedirect}>Sign up</span>
        </div>
      </div>
    );
  }
}

export default SignupHeader;
