import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SigninHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className='signin-header'>
        <h1 className='logo'>coincenter</h1>
        <div className='nav-links-container'>
          <Link className='signin-link' to='/signin'>Sign in</Link>
          <div className='signup-link-container'>
            <Link className='signup-link' to='/signup'>Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SigninHeader);
