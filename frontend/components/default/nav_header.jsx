import React from 'react';
import { withRouter } from 'react-router-dom';

class NavHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className='navbar'>
        <div className='logo'>coincenter</div>
        <span className='profile-dropdown' onClick={(e) => this.props.signout()}>Sign out</span>
      </div>
    );
  }
}

export default withRouter(NavHeader);
