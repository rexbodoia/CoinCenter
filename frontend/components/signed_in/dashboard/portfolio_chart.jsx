import React from 'react';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.balances = this.props.balances;
  //   this.prices = this.props.prices;
  // }
  //
  // renderChart(data) {
  //   if (data.length !== 0){
  //     console.log(data);
  //     return (
  //       <LineChart width={1200} height={250} data={data} >
  //         <Line type="natural" dataKey="price" stroke="rgb(6, 103, 208)" dot={false} />
  //       </LineChart>
  //     );
  //   }
  // }

  render () {
    // let totalData = [];
    // if (Object.values(this.prices).length !== 0) {
    //   console.log('has prices');
    //   let currentBalances = getState().entities.balances
    //   let currentBitcoin = currentBalances.bitcoin.amount / prices.bitcoin[0];
    //   let currentEthereum = currentBalances.ethereum.amount / prices.ethereum[0];
    //   let currentLitecoin = currentBalances.litecoin.amount / prices.litecoin[0];
    //   let currentBitcoinCash = currentBalances.bitcoinCash.amount / prices.bitcoinCash[0];
    //   let bitcoinData = [];
    //   let ethereumData = [];
    //   let litecoinData = [];
    //   let bitcoinCashData = [];
    //   for (let i = 0; i < prices.bitcoin.length; i++){
    //     bitcoinData.push(currentBitcoin * prices.bitcoin[i]);
    //     ethereumData.push(currentEthereum * prices.ethereum[i]);
    //     litecoinData.push(currentLitecoin * prices.litecoin[i]);
    //     bitcoinCashData.push(currentBitcoinCash * prices.bitcoinCash[i]);
    //   }
    //   totalData = bitcoinData + ethereumData + litecoinData + bitcoinCashData;
    // }
    return (
      <div className='chart-container'>
        {/* {this.renderChart(totalData)} */}
      </div>
    );
  }
}

export default PortfolioChart;
