import React from 'react';
import { LineChart, Line } from 'recharts';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (Object.values(getState().entities.prices).length !== 0) {
      let prices = this.props.prices
    } else {
      this.props.getPrices();
    }
    if (Object.values(getState().entities.balances).length !== 0) {
      let balances = this.props.balances
    } else {
      this.props.getBalances();
    }
  }

  renderChart(data) {
    if (data.length !== 0){
      return (
        <LineChart width={1200} height={250} data={data} >
          <Line type="natural" dataKey="amount" stroke="rgb(6, 103, 208)" dot={false} />
        </LineChart>
      );
    }
  }

  render () {
    let prices = getState().entities.prices;
    let balances = getState().entities.balances;
    let totalData = [];
    if (Object.values(prices).length !== 0 && Object.values(balances).length !== 0) {
      let currentBalances = balances;

      let currentBitcoin = currentBalances.bitcoin.amount / prices.bitcoin[0].price;

      let currentEthereum = currentBalances.ethereum.amount / prices.ethereum[0].price;

      let currentLitecoin = currentBalances.litecoin.amount / prices.litecoin[0].price;

      let currentBitcoinCash = currentBalances.bitcoinCash.amount / prices.bitcoinCash[0].price;

      let bitcoinData = [];
      let ethereumData = [];
      let litecoinData = [];
      let bitcoinCashData = [];

      for (let i = 0; i < prices.bitcoin.length; i++){
        let bitcoinAmount = currentBitcoin * prices.bitcoin[i].price;

        let ethereumAmount = currentEthereum * prices.ethereum[i].price;

        let litecoinAmount = currentLitecoin * prices.litecoin[i].price;

        let bitcoinCashAmount = currentBitcoinCash * prices.bitcoinCash[i].price;

        totalData.push({date: prices.bitcoin[i].date, amount: bitcoinAmount + ethereumAmount + litecoinAmount + bitcoinCashAmount});
      }
      // totalData = totalData.reverse();

    }
    return (
      <div className='chart-container'>
        {this.renderChart(totalData)}
      </div>
    );
  }
}

export default PortfolioChart;
