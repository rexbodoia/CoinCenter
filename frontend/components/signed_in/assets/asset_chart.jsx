import React from 'react';
import { AreaChart, Area, Tooltip, YAxis } from 'recharts';
import { filterPrices } from '../../../util/calculations';
import * as timeframeFunctions from '../../../util/timeframe_manipulation';

class AssetChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeframe: 'month'
    }

    this.coins = {
      BTC: 'Bitcoin',
      BCH: 'Bitcoin Cash',
      ETH: 'Ethereum',
      LTC: 'Litecoin'
    }

    this.descriptions = {
      BTC: 'The world’s first cryptocurrency, bitcoin is stored and exchanged securely on the internet through a digital ledger known as a blockchain. Bitcoins are divisible into smaller units known as satoshis — each satoshi is worth 0.00000001 bitcoin.',
      LTC: 'Litecoin is a cryptocurrency that uses a faster payment confirmation schedule and a different cryptographic algorithm than Bitcoin.',
      ETH: 'Ethereum is both a cryptocurrency and a decentralized computing platform. Developers can use Ethereum to create decentralized applications and issue new assets, known as tokens.',
      BCH: 'Bitcoin Cash is fork of Bitcoin that seeks to add more transaction capacity to the network in order to be useful for everyday transactions.'
    }

    this.coin = this.props.coin;
    this.changeTimeframe = this.changeTimeframe.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.calculatePrice = this.calculatePrice.bind(this);
    this.renderOthers = this.renderOthers.bind(this);
    this.renderDifferences = this.renderDifferences.bind(this);
  }

  componentDidMount() {
    $('#month').css('color', 'rgb(6, 103, 208)');
    this.retrievePrices('sixHours');
    this.state = { timeframe: 'month' };
  }

  retrievePrices(granularity) {
    if (!Object.keys(this.props.prices[granularity]).includes(this.coin)) {
      this.props.getPrices(this.coin, granularity);
    }
  }

  renderChart(granularity) {
    if (Object.keys(this.props.prices[granularity]).includes(this.coin)) {

      let length = timeframeFunctions.findNumDataPoints(this.state.timeframe);
      let data = this.props.prices[granularity][this.coin];
      data = filterPrices(data, length).reverse();

      if (data.length !== 0) {
        return (
          <AreaChart width={1188} height={260} padding={0} data={data}>

            <Area type="monotone" dataKey="price" fill="rgb(244, 247, 250)" fillOpacity={1} stroke="rgb(6, 103, 208)" strokeWidth={1.4}/>
            <YAxis hide={true} domain={[dataMin => dataMin, dataMax => dataMax]} />
            <Tooltip labelStyle={{ display: 'none' }} itemStyle={{ backgroundColor: "rgb(80, 80, 100)", padding: 8, textAlign: 'center', fontSize: 18 }} />
          </AreaChart>
        );
      }
    }
  }

  calculatePrice(granularity) {
    if (Object.keys(this.props.prices[granularity]).includes(this.coin)){
      let arr = [this.props.prices[granularity][this.coin][0]];
      return filterPrices(arr, 1)[0].price
    } else {
      return 0;
    }
  }

  calculateDec(price, integer) {
    let decimal = (price - integer).toFixed(2).toString();
    return '.' + decimal.slice(-2);
  }

  changeTimeframe(timeframe) {
    $(`#${this.state.timeframe}`).css('color', 'rgb(155, 166, 178)');
    this.setState({ timeframe });
    $(`#${timeframe}`).css('color', 'rgb(6, 103, 208)');

    let granularity = timeframeFunctions.timeGranConverter(timeframe);
    this.retrievePrices(granularity);
  }

  renderOthers(granularity) {
    let coin = this.coin;
    let others = Object.keys(this.coins).filter(c => c !== coin);
    return others.map(other => <div className='other-description-item'>
      <img src={window.images[other]} display='inline-block'></img>
      <div><h1>{this.coins[other]} {other}</h1><br></br>
      <h2>${this.calculatePrice(granularity)}</h2>
    </div>
      <p>{this.descriptions[other]}</p>
    </div>);
  }

  renderDifferences(granularity) {
    if (Object.keys(this.props.prices[granularity]).includes(this.coin)) {
      let length = timeframeFunctions.findNumDataPoints(this.state.timeframe)
      let rawPrices = this.props.prices[granularity][this.coin]
      let data = filterPrices(rawPrices, length);
      let first = data[0].price;
      let last = data[data.length - 1].price;
      let diff = (first - last) / last;

      let absoluteDiff = first - last;
      let percentDiff = (diff * 100).toFixed(2);

      if (absoluteDiff >= 0) {
        return (
          <h1 className='green-asset'>+${absoluteDiff.toFixed(2)} ({percentDiff}%)</h1>
        );
      } else {
        return (
          <h1 className='red-asset'>-${-absoluteDiff.toFixed(2)} ({-percentDiff}%)</h1>
        );
      }
    } else {
      return (
        <h1>+$0.00 (0.00%)</h1>
      );
    }

  }

  render () {
    let granularity = timeframeFunctions.timeGranConverter(this.state.timeframe);
    let price = this.calculatePrice(granularity);
    let integer = Math.floor(price);
    let decimal = this.calculateDec(price, integer);

    // let [absoluteDiff, percentDiff] = this.renderDifferences(granularity);

    return (
      <div style={{ width: '82%', margin: '0 auto' }}>
        <div className='asset-header'>
          <img src={window.images[this.coin]}></img>
            <div><h1>{this.coins[this.coin]}</h1><h2>{this.coin}</h2></div>
        </div>
        <div className='asset-chart-container'>
          <div className='asset-chart-header'>
            <div className='asset-chart-number'>
              <h3>$</h3>
              <h2>{integer}</h2>
              <h3>{decimal}</h3>
              {this.renderDifferences(granularity)}
            </div>
          </div>
          <ul className='portfolio-chart-time-frames'>
            <li onClick={(e) => this.changeTimeframe('hour')} id='hour'>1H</li>
            <li onClick={(e) => this.changeTimeframe('day')} id='day'>1D</li>
            <li onClick={(e) => this.changeTimeframe('week')} id='week'>1W</li>
            <li onClick={(e) => this.changeTimeframe('month')} id='month'>1M</li>
            <li onClick={(e) => this.changeTimeframe('year')} id='year'>1Y</li>
          </ul>
          {this.renderChart(granularity)}
          <div className='asset-chart-dates'>
            <ul>
              {timeframeFunctions.renderDates(this.state.timeframe, '.asset-chart-dates')}
            </ul>
          </div>
        </div>
        <div className='asset-description'>
          <h1>About {this.coins[this.coin]}</h1>
          <p>{this.descriptions[this.coin]}</p>
        </div>
        <h1 id='more-assets'>More Assets</h1><br></br>
        <div className='other-asset-descriptions'>
          {this.renderOthers(granularity)}
        </div>
      </div>
    );
  }
}

export default AssetChart;