import React from 'react';
import { AreaChart, Area, Line } from 'recharts';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
    this.calculateBalanceHistory = this.calculateBalanceHistory.bind(this);
    this.retrieveBalances = this.retrieveBalances.bind(this);
    this.totalData = [];
  }

  componentDidMount() {
    this.balancesInteger = 0;
    this.balancesDecimal = 0;
    this.retrieveBalances();
  }

  retrieveBalances() {
    this.props.getBalances(this.props.id);
  }

  calculateBalanceHistory() {
    let balances = this.props.balances;

    for (let i = 0; i < balances.bitcoin.length; i++){
      let amount = balances.bitcoin[i].amount + balances.bitcoinCash[i].amount + balances.ethereum[i].amount + balances.litecoin[i].amount;

      let date = balances.bitcoin[i].date;

      this.totalData.push({date, amount});
    }
  }

  renderChart(data) {
    if (data.length !== 0){
      return (
        <AreaChart width={1188} height={160} data={data} >
          <Area type="monotone" dataKey="amount" fill="rgb(244, 247, 250)" fillOpacity={1} stroke="rgb(6, 103, 208)" strokeWidth={1.4}/>
        </AreaChart>
      );
    }
  }

  render () {
    if (Object.values(this.props.balances).length !== 0) {
      this.calculateBalanceHistory();
    }
    return (
      <div className='portfolio-chart-container'>
        <div className='portfolio-chart-header'>
          <h1>Your portfolio value</h1>
          <div className='portfolio-chart-number'>
            <h3>$</h3>
            <h2>{this.balancesInteger}</h2>
            <h3>{this.balancesDecimal}</h3>
          </div>
        </div>
        {this.renderChart(this.totalData)}
        <div className='portfolio-chart-dates'>
          <ul>
            <li>Feb</li>
            <li>Mar</li>
            <li>Apr</li>
            <li>May</li>
            <li>Jun</li>
            <li>July</li>
            <li>Aug</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PortfolioChart;


// if (!this.props.balances && !this.props.prices) {
//   return null;
// }
// let prices = this.props.prices;
// let balances = this.props.balances;
// let totalData = [];
// let totalCurrentBalances = 0;
//
// let currentBalances = balances;
//
// let currentBitcoin = currentBalances.bitcoin.amount / prices.bitcoin[0].price;
//
// let currentEthereum = currentBalances.ethereum.amount / prices.ethereum[0].price;
//
// let currentLitecoin = currentBalances.litecoin.amount / prices.litecoin[0].price;
//
// let currentBitcoinCash = currentBalances.bitcoinCash.amount / prices.bitcoinCash[0].price;
//
// let bitcoinData = [];
// let ethereumData = [];
// let litecoinData = [];
// let bitcoinCashData = [];
//
// for (let i = 0; i < prices.bitcoin.length; i++){
//   let bitcoinAmount = currentBitcoin * prices.bitcoin[i].price;
//
//   let ethereumAmount = currentEthereum * prices.ethereum[i].price;
//
//   let litecoinAmount = currentLitecoin * prices.litecoin[i].price;
//
//   let bitcoinCashAmount = currentBitcoinCash * prices.bitcoinCash[i].price;
//
//   totalData.push({date: prices.bitcoin[i].date, amount: bitcoinAmount + ethereumAmount + litecoinAmount + bitcoinCashAmount});
// }
// totalData = totalData.reverse();
//
// totalCurrentBalances = currentBalances.bitcoin.amount + currentBalances.ethereum.amount + currentBalances.litecoin.amount + currentBalances.bitcoinCash.amount
//
// this.balancesInteger = Math.floor(totalCurrentBalances);
// this.balancesDecimal = (totalCurrentBalances - balancesInteger).toFixed(2);
