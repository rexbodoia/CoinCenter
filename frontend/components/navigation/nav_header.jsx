import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './navbar';

class NavHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className='nav-header'>
        <div className='title-bar'>
          <div className='logo'>coincenter</div>
          <span className='profile-dropdown' onClick={(e) => this.props.signout()}>Sign out</span>
        </div>
        <Navbar />
      </div>
    );
  }
}

export default withRouter(NavHeader);
