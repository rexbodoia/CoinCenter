import React from 'react';

class BuySell extends React.Component {
  constructor(props){
    super(props);

    this.renderIcon = this.renderIcon.bind(this);
  }

  renderIcon() {
    if (this.props.selected) {
      return (
        <div>
          <img src={window.images.buySellBlue} className='navbar-icon rendered-icon'></img>
          <img src={window.images.buySellGray} className='navbar-icon unrendered-icon'></img>
        </div>
      );
    } else {
      return (
        <div>
          <img src={window.images.buySellGray} className='navbar-icon rendered-icon'></img>
          <img src={window.images.buySellBlue} className='navbar-icon unrendered-icon'></img>
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        {this.renderIcon()}
        <p className='nav-el-text'>Buy/Sell</p>
      </div>
    );
  }
}

export default BuySell;
