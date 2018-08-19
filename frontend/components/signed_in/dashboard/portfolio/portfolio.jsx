import React from 'react';
import PortfolioListItem from './portfolio_list_item';
import * as Calculations from '../../../../util/calculations';
import { ClipLoader } from 'react-spinners';
import PortfolioPieChart from './pie_chart';

class Portfolio extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        tab: 'List'
      }

      this.selectTab = this.selectTab.bind(this);
      this.renderTab = this.renderTab.bind(this);
      this.calculate = this.calculate.bind(this);
      this.renderContent = this.renderContent.bind(this);
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

  calculate() {
    const coins = ['BCH', 'BTC', 'ETH', 'LTC'];

    let balances = [0,0,0,0];
    let values = [0,0,0,0];
    let transactions = this.props.transactions;
    let prices = this.props.prices.oneHour;

    for (let i = 0; i < coins.length; i++) {
      let amounts = [{ amount: 0 }];

      if (Object.values(this.props.transactions).length === 4) {
        amounts = Calculations.calculateNetCoinAmounts(transactions[coins[i]]);
      }
      balances[i] = (amounts[amounts.length - 1].amount);

      if (Object.values(prices).length === 4) {
        values[i] = (prices[coins[i]][0][3] * balances[i]);
      }
    }

    let total = 10000000000;
    if (!values.every(el => el === 0)) {
      total = values.reduce((acc, curr) => acc + curr, 0);
    }

    return [balances, values, total];
  }

  renderPieChart(values) {
    if (values.every(el => el === 0)) {
      return (
        <div className='pie-chart-spinner'>
          <ClipLoader
            className='spinner'
            sizeUnit={"px"}
            size={70}
            color={'rgb(155, 166, 178)'}
          />
        </div>
      );
    } else {
      return (
        <div className='pie-chart'>
          <PortfolioPieChart values={values} />
        </div>
      );
    }
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

  renderContent() {
    let [balances, values, total] = this.calculate();

    if (this.state.tab === 'List') {
      return (
        this.renderPortfolioList(balances, values, total)
      );
    } else {
      return (
        this.renderPieChart(values)
      );
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
        {this.renderContent()}
      </div>
    );
  }
}

export default Portfolio;
