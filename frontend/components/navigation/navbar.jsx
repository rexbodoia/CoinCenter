import React from 'react';
import Dashboard from './dashboard';
import BuySell from './buy_sell';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    // this.select = this.select.bind(this);
  }

  // select(e) {
  //   e.preventDefault();
  //   document.getElementsByTagName('Dashboard')
  // }

  render () {
    return (
      <div className='navbar-outer-container'>
        <div className='empty-nav'></div>
        <div className='navbar-inner-container'>
          <div className='navbar-left'>
            {/* <span className='dashboard-container' onClick={this.select}> */}
              <Dashboard />
            {/* </span> */}
            <div className='inner-empty-nav'></div>
            {/* <span className='buy-sell-container' onClick={this.select}> */}
              <BuySell/>
            {/* </span> */}
          </div>
          <div className='empty-nav'></div>
        </div>
        <div className='empty-nav'></div>
      </div>
    );
  }
}

export default Navbar;
