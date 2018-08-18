import React from 'react';
import { AreaChart, Area, Tooltip, YAxis } from 'recharts';
import { filterPrices, findChartDifferences } from '../../../util/calculations';
import * as timeframeFunctions from '../../../util/timeframe_manipulation';

class AssetChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeframe: '1M'
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
      BCH: 'Bitcoin Cash is a fork of Bitcoin that seeks to add more transaction capacity to the network in order to be useful for everyday transactions.'
    }

    this.coin = this.props.coin;
    this.others = Object.keys(this.coins).filter(c => c !== this.coin);
    this.changeTimeframe = this.changeTimeframe.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.calculatePrice = this.calculatePrice.bind(this);
    this.renderOthers = this.renderOthers.bind(this);
    this.calculateDifferences = this.calculateDifferences.bind(this);
  }

  componentDidMount() {
    $('#month').css('color', 'rgb(6, 103, 208)');
    this.props.getPrices(this.coin, 'sixHours')
      .then(() => setTimeout(() => this.props.getPrices(this.others[0], 'oneMinute')
      .then(() => setTimeout(() => this.props.getPrices(this.others[1], 'oneMinute')
      .then(() => setTimeout(() => this.props.getPrices(this.others[2], 'oneMinute'), 334)), 334)), 334));
    this.state = { timeframe: '1M' };
  }

  retrievePrices(granularity) {
    if (Object.values(this.props.prices[granularity]).length < 4) {
      this.props.getPrices(this.coin, granularity)
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

  calculatePrice(coin, granularity) {
    if (Object.keys(this.props.prices[granularity]).includes(coin)){
      let arr = [this.props.prices[granularity][coin][0]];
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
    this.setState({ timeframe });
    let granularity = timeframeFunctions.timeGranConverter(timeframe);
    this.retrievePrices(granularity);
  }

  renderTimeframe(timeframe) {
    if (this.state.timeframe === timeframe) {
      return (
        <li onClick={(e) => this.changeTimeframe(timeframe)} className='selected-timeframe'>{timeframe}</li>
      );
    } else {
      return (
        <li onClick={(e) => this.changeTimeframe(timeframe)} className='unselected-timeframe'>{timeframe}</li>
      );
    }
  }

  renderOthers() {
    let coin = this.coin;
    return this.others.map(other => <div className='other-description-item'>
      <img src={window.images[other]} display='inline-block'></img>
      <div><h1>{this.coins[other]} {other}</h1><br></br>
      <h2>${this.calculatePrice(other, 'oneMinute')}</h2>
    </div>
      <p>{this.descriptions[other]}</p>
    </div>);
  }

  calculateDifferences(granularity) {
    if (Object.keys(this.props.prices[granularity]).includes(this.coin)) {
      let length = timeframeFunctions.findNumDataPoints(this.state.timeframe)
      let rawPrices = this.props.prices[granularity][this.coin]
      let data = filterPrices(rawPrices, length);

      let [absoluteDiff, percentDiff] = findChartDifferences(data);

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
    let price = this.calculatePrice(this.coin, granularity);
    let integer = Math.floor(price);
    let decimal = this.calculateDec(price, integer);

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
              {this.calculateDifferences(granularity)}
            </div>
          </div>
          <ul className='chart-timeframes'>
            {this.renderTimeframe('1H')}
            {this.renderTimeframe('1D')}
            {this.renderTimeframe('1W')}
            {this.renderTimeframe('1M')}
            {this.renderTimeframe('1Y')}
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
          {this.renderOthers()}
        </div>
      </div>
    );
  }
}

export default AssetChart;
