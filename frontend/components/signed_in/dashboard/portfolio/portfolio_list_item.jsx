import React from 'react';

class PortfolioListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="portfolio-list-item">
        <img src={window.images[this.props.symbol]}></img>
        <h1>{this.props.coin}</h1>
        <h2>{this.props.proportion.toFixed(2)}%</h2>
        <span>{this.props.currentBalance.toFixed(4)} {this.props.symbol}</span>
        <h3>${this.props.currentValue.toFixed(2)}</h3>
      </div>
    );
  }
}

export default PortfolioListItem;
