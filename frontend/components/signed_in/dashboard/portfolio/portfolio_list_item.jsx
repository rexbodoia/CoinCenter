import React from 'react';

class PortfolioListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="portfolio-list-item">
        <h1>{this.props.coin}</h1>
        <span>{this.props.currentBalance.toFixed(2)}</span>
      </div>
    );
  }
}

export default PortfolioListItem;
