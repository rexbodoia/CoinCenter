import React from 'react';
import PortfolioListItem from './portfolio_list_item';
import { filterPrices, calculateCoinValues, compileBalanceValues, calculateNetCoinAmounts } from '../../../../util/calculations';

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
    if(Object.keys(this.props.prices).includes('oneHour') && Object.values(this.props.prices.oneHour).length === 4 && Object.values(this.props.transactions).length === 4){
      let bchData = filterPrices(this.props.prices['oneHour'].BCH, 1);
      let btcData = filterPrices(this.props.prices['oneHour'].BTC, 1);
      let ethData = filterPrices(this.props.prices['oneHour'].ETH, 1);
      let ltcData = filterPrices(this.props.prices['oneHour'].LTC, 1);

      let bchAmounts = calculateNetCoinAmounts(this.props.transactions.BCH);
      let btcAmounts = calculateNetCoinAmounts(this.props.transactions.BTC);
      let ethAmounts = calculateNetCoinAmounts(this.props.transactions.ETH);
      let ltcAmounts = calculateNetCoinAmounts(this.props.transactions.LTC);

      let bchValues = calculateCoinValues(bchAmounts, bchData);
      let btcValues = calculateCoinValues(btcAmounts, btcData);
      let ethValues = calculateCoinValues(ethAmounts, ethData);
      let ltcValues = calculateCoinValues(ltcAmounts, ltcData);

      return compileBalanceValues([bchValues, btcValues, ethValues, ltcValues])[0].value.toFixed(2);
    } else {
      return '0.00';
    }
  }

  render () {
    let bchAmounts = [{ amount: 0 }];
    let btcAmounts = [{ amount: 0 }];
    let ethAmounts = [{ amount: 0 }];
    let ltcAmounts = [{ amount: 0 }];

    if(Object.values(this.props.transactions).length === 4){
      bchAmounts = calculateNetCoinAmounts(this.props.transactions.BCH);
      btcAmounts = calculateNetCoinAmounts(this.props.transactions.BTC);
      ethAmounts = calculateNetCoinAmounts(this.props.transactions.ETH);
      ltcAmounts = calculateNetCoinAmounts(this.props.transactions.LTC);
    }

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
        <PortfolioListItem coin={'BCH'} currentBalance={bchAmounts[bchAmounts.length - 1].amount} />
        <PortfolioListItem coin={'BTC'} currentBalance={btcAmounts[btcAmounts.length - 1].amount} />
        <PortfolioListItem coin={'ETH'} currentBalance={ethAmounts[ethAmounts.length - 1].amount} />
        <PortfolioListItem coin={'LTC'} currentBalance={ltcAmounts[ltcAmounts.length - 1].amount} />
        <div className='portfolio-footer'>
          <span>Total Balance &asymp; ${this.calculateCurrentValue()}</span>
        </div>
      </div>
    );
  }
}

export default Portfolio;
