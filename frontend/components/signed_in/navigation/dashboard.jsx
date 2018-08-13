import React from 'react';

class Dashboard extends React.Component {
  constructor(props){
    super(props);

    this.renderIcon = this.renderIcon.bind(this);
  }

  renderIcon() {
    if (this.props.selected) {
      return (
        <div>
          <img src={window.images.dashboardBlue} className='navbar-icon rendered-icon'></img>
          <img src={window.images.dashboardGray} className='navbar-icon unrendered-icon'></img>
        </div>
      );
    } else {
      return (
        <div>
          <img src={window.images.dashboardGray} className='navbar-icon rendered-icon'></img>
          <img src={window.images.dashboardBlue} className='navbar-icon unrendered-icon'></img>
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        {this.renderIcon()}
        <p className='nav-el-text'>Dashboard</p>
      </div>
    );
  }
}

export default Dashboard;
