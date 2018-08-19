import React from 'react';
import PortfolioListItem from './portfolio_list_item';
import * as Calculations from '../../../../util/calculations';

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
      return Calculations.compileBalanceValues(Calculations.calculationHelper(this.props.prices, this.props.transactions, 'oneHour', 1))[0].value.toFixed(2);
    } else {
      return '0.00';
    }
  }

  renderPieChart() {

  }

  renderPortfolioList(balances, values, total) {
    return (
      <div>
        <PortfolioListItem coin={'Bitcoin Cash'} symbol={'BCH'} currentBalance={balances[0]} currentValue={values[0]} proportion={values[0] / total * 100} />
        <PortfolioListItem coin={'Bitcoin'} symbol={'BTC'} currentBalance={balances[1]} currentValue={values[1]} proportion={values[1] / total * 100} />
        <PortfolioListItem coin={'Ethereum'} symbol={'ETH'} currentBalance={balances[2]} currentValue={values[2]} proportion={values[2] / total * 100} />
        <PortfolioListItem coin={'Litecoin'} symbol={'LTC'} currentBalance={balances[3]} currentValue={values[3]} proportion={values[3] / total * 100} />
        <div className='portfolio-footer'>
          <span>Total Balance &asymp; ${this.calculateCurrentValue()}</span>
        </div>
      </div>
    );
  }

  render () {
    let balances = [];
    let values = [];

    let bchAmounts = [{ amount: 0 }];
    let btcAmounts = [{ amount: 0 }];
    let ethAmounts = [{ amount: 0 }];
    let ltcAmounts = [{ amount: 0 }];

    if(Object.values(this.props.transactions).length === 4){
      bchAmounts = Calculations.calculateNetCoinAmounts(this.props.transactions.BCH);
      btcAmounts = Calculations.calculateNetCoinAmounts(this.props.transactions.BTC);
      ethAmounts = Calculations.calculateNetCoinAmounts(this.props.transactions.ETH);
      ltcAmounts = Calculations.calculateNetCoinAmounts(this.props.transactions.LTC);
    }

    balances.push(bchAmounts[bchAmounts.length - 1].amount);
    balances.push(btcAmounts[btcAmounts.length - 1].amount);
    balances.push(ethAmounts[ethAmounts.length - 1].amount);
    balances.push(ltcAmounts[ltcAmounts.length - 1].amount);

    let bchValue = 0;
    let btcValue = 0;
    let ethValue = 0;
    let ltcValue = 0;

    let total = 1000000000000;

    if (Object.values(this.props.prices.oneHour).length === 4) {
      bchValue = this.props.prices.oneHour.BCH[0][3] * balances[0];
      btcValue = this.props.prices.oneHour.BTC[0][3] * balances[1];
      ethValue = this.props.prices.oneHour.ETH[0][3] * balances[2];
      ltcValue = this.props.prices.oneHour.LTC[0][3] * balances[3];

      total = bchValue + btcValue + ethValue + ltcValue;
    }

    values = [bchValue, btcValue, ethValue, ltcValue]

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
        {this.renderPortfolioList(balances, values, total)}
      </div>
    );
  }
}

export default Portfolio;
