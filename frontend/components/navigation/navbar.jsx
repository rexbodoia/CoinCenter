import React from 'react';
import Dashboard from './dashboard';
import BuySell from './buy_sell';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className='navbar-outer-container'>
        <div className='empty-nav'></div>
        <div className='navbar-inner-container'>
          <div className='navbar-left'>
              <Dashboard />
            <div className='inner-empty-nav'></div>
              <BuySell/>
          </div>
          <div className='empty-nav'></div>
        </div>
        <div className='empty-nav'></div>
      </div>
    );
  }
}

export default Navbar;
