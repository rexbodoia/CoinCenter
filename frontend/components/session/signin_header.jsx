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
        <div className='signin-nav-links-container'>
          <Link className='signin-same-link' to='/signin'>Sign In</Link>
          <div className='signin-other-container'>
            <Link className='signin-other-link' to='/signup'>Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SigninHeader);
