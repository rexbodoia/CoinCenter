import React from 'react';
import { AreaChart, Area, YAxis } from 'recharts';

class ChartPreviewItem extends React.Component {
  constructor(props){
    super(props);

    this.coin = this.props.coin;

    this.colors = {
      'Bitcoin': "rgb(247, 170, 4)",
      'Bitcoin Cash': "rgb(134, 175, 58)",
      'Ethereum': "rgb(86, 116, 226)",
      'Litecoin': "rgb(191, 189, 189)"
    }
    this.coins = {
      'Bitcoin': 'BTC',
      'Bitcoin Cash': 'BCH',
      'Ethereum': 'ETH',
      'Litecoin': 'LTC'
    }

    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    let prices = this.props.prices;
    if (prices[0].price - prices[prices.length - 1].price >= 0) {
      $('#' + this.coins[this.coin]).css('color', 'rgb(97, 202, 0)');
    }
  }

  redirect(coin) {
    return (e) => {
      this.props.history.push(`/assets/${coin}`);
    }
  }

  render() {
    const data = this.props.prices;
    const first = data[0].price;
    const last = data[data.length - 1].price;
    const diff = (first - last) / last;

    let percentDiff = (diff * 100).toFixed(2);

    if (percentDiff >= 0) {
      percentDiff = '+' + percentDiff;
    }

    return (
      <div className='chart-preview-container' onClick={this.redirect(this.coins[this.coin])}>
        <div className='chart-preview-header'>
          <div className='chart-preview-title'>
            <h1>{this.coin}</h1>
          </div>
          <div className='chart-preview-number'>
            <h1>${first.toFixed(2)}</h1>
            <h2 id={this.coins[this.coin]}>{percentDiff}%</h2>
          </div>
        </div>

        <AreaChart width={294} height={120} data={data} >

          <Area type="monotone" dataKey="price" fill="white" fillOpacity={1} stroke={this.colors[this.coin]} strokeWidth={1.6}/>
          <YAxis hide={true} domain={[dataMin => dataMin, dataMax => dataMax]} />
        </AreaChart>
      </div>
    );
  }
}

export default ChartPreviewItem;
