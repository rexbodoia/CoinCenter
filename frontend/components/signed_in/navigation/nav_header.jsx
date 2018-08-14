import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './navbar';

class NavHeader extends React.Component {
  constructor(props) {
    super(props);

    this.user = this.props.user;
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.renderDropdown = this.renderDropdown.bind(this);
    this.state = {
      open: false
    };
  }

  openDropdown(e) {
    this.setState({open: true});
  }

  closeDropdown(e) {
    this.setState({open: false});
  }

  renderDropdown() {
    if (this.state.open) {
      return (
        <div>
          <section className='dropdown-modal-screen' onClick={this.closeDropdown}></section>
          <div className='dropdown'>
            <h1 className='user-name'>{this.user.f_name} {this.user.l_name}</h1>
            <h3 className='user-email'>{this.user.email}</h3>
            <div className='sign-out-button'>
              <div className='sign-out' onClick={(e) => this.props.signout()}>Sign out</div>
            </div>
          </div>
        </div>
      );
    }
  }

  render () {
    return (
      <div className='nav-header'>
        <div className='title-bar'>
          <div className='logo'>coincenter</div>
          <span className='profile-dropdown' onClick={(e) => this.openDropdown()}>{this.user.f_name} {this.user.l_name} &#9776;</span>
        </div>
        {this.renderDropdown()}
        <Navbar history={this.props.history}/>
      </div>
    );
  }
}

export default withRouter(NavHeader);
