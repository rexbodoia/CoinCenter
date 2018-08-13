import React from 'react';
import Dashboard from './dashboard';
import BuySell from './buy_sell';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.selectTab = this.selectTab.bind(this);
    this.renderDashboard = this.renderDashboard.bind(this);
    this.state = {
      'dashboard': true,
      'buySell': false
    }
  }

  selectTab(self, other) {
    return (e) => {
      if(this.state[other]) {
        this.setState({[other]: false});
      }
      this.setState({[self]: true});
    };
  }

  renderDashboard() {
    if(this.state.dashboard){
      return(
        <span className='navbar-element selected-tab' onClick={this.selectTab('dashboard', 'buySell')}>
          <Dashboard selected={true} />
        </span>
      );
    }
    else {
      return(
        <span className='navbar-element' onClick={this.selectTab('dashboard', 'buySell')}>
          <Dashboard selected={false} />
        </span>
      );
    }
  }

  renderBuySell() {
    if(this.state.buySell){
      return(
        <span className='navbar-element selected-tab' onClick={this.selectTab('buySell', 'dashboard')} >
          <BuySell selected={true} />
        </span>
      );
    }
    else {
      return(
        <span className='navbar-element' onClick={this.selectTab('buySell', 'dashboard')} >
          <BuySell selected={false} />
        </span>
      );
    }
  }

  render () {
    return (
      <div className='navbar-outer-container'>
        <div className='empty-nav'></div>
        <div className='navbar-inner-container'>
          <div className='navbar-left'>
            <span className='navbar-element' onClick={this.selectTab('dashboard', 'buySell')}>
              {this.renderDashboard()}
            </span>
            <div className='inner-empty-nav'></div>
            <span className='navbar-element' onClick={this.selectTab('buySell', 'dashboard')}>
              {this.renderBuySell()}
            </span>
          </div>
          <div className='empty-nav'></div>
        </div>
        <div className='empty-nav'></div>
      </div>
    );
  }
}

export default Navbar;
