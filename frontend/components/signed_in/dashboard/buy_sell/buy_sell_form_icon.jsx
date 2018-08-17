import React from 'react';

class BuySellFormIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='buy-sell-form-icon'>
        <img src={window.images[this.props.symbol]}></img>
        <h1>{this.props.coin}</h1>
      </div>
    );
  }
}

export default BuySellFormIcon;
