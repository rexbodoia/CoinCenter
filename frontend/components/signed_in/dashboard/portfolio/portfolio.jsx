import React from 'react';
import PortfolioListContainer from './portfolio_list_container';
import { filterPrices, calculateCoinValues, compileBalanceValues } from '../../../../util/calculations';

class Portfolio extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        tab: 'List'
      }

      this.selectTab = this.selectTab.bind(this);
      this.renderTab = this.renderTab.bind(this);
      this.calculateCurrentValue = this.calculateCurrentValue.bind(this);
  }

  selectTab(tab) {
    return (e) => {
      this.setState({ tab })
    }
  }

  renderTab(tab) {
    if (this.state.tab === tab) {
      return (
        <div className='selected-portfolio-tab'><span onClick={this.selectTab(tab)}>{tab}</span></div>
      );
    } else {
      return (
        <div className='unselected-portfolio-tab'><span onClick={this.selectTab(tab)}>{tab}</span></div>
      );
    }
  }

  calculateCurrentValue() {
    if(Object.keys(this.props.prices).includes('oneHour') && Object.values(this.props.prices.oneHour).length === 4){
      let bchData = filterPrices(this.props.prices['oneHour'].BCH, 1);
      let btcData = filterPrices(this.props.prices['oneHour'].BTC, 1);
      let ethData = filterPrices(this.props.prices['oneHour'].ETH, 1);
      let ltcData = filterPrices(this.props.prices['oneHour'].LTC, 1);

      let bchValues = calculateCoinValues(this.props.transactions.BCH, bchData);
      let btcValues = calculateCoinValues(this.props.transactions.BTC, btcData);
      let ethValues = calculateCoinValues(this.props.transactions.ETH, ethData);
      let ltcValues = calculateCoinValues(this.props.transactions.LTC, ltcData);

      return compileBalanceValues([bchValues, btcValues, ethValues, ltcValues])[0].value.toFixed(2);
    } else {
      return '0.00';
    }
  }

  render () {
    return (
      <div className='portfolio-container'>
        <div className='portfolio-header'>
          <div className='portfolio-left'><h1>Your Portfolio</h1></div>
          <div className='portfolio-tabs'>
            {this.renderTab('List')}
            <div className='portfolio-empty-div'></div>
            {this.renderTab('Chart')}
            <div className='portfolio-empty-div' style={{ paddingRight: 8 }}></div>
          </div>
        </div>
        {/* <PortfolioListContainer /> */}
        <div className='portfolio-footer'>
          <span>Total Balance &asymp; ${this.calculateCurrentValue()}</span>
        </div>
      </div>
    );
  }
}

export default Portfolio;
