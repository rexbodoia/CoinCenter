import React from 'react';
import { AreaChart, Area, Tooltip, YAxis } from 'recharts';
// import PortfolioCustomToolTip from './portfolio_custom_tool_tip';
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

    this.coin = this.props.coin;
    this.changeTimeframe = this.changeTimeframe.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  componentDidMount() {
    $('#month').css('color', 'rgb(6, 103, 208)');
    this.retrievePrices('sixHours');
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
      data = filterPrices(data, length);

      if (data.length !== 0) {
        return (
          <AreaChart width={1188} height={260} data={data}>

            <Area type="monotone" dataKey="price" fill="rgb(244, 247, 250)" fillOpacity={1} stroke="rgb(6, 103, 208)" strokeWidth={1.4}/>
            <YAxis hide={true} domain={[dataMin => dataMin, dataMax => dataMax]} />
            {/* <Tooltip labelStyle={{ color: "rgb(125, 149, 182)" }} content={<PortfolioCustomToolTip />}/> */}
          </AreaChart>
        );
      }
    }
  }

  changeTimeframe(timeframe) {
    $(`#${this.state.timeframe}`).css('color', 'rgb(155, 166, 178)');
    this.setState({ timeframe });
    $(`#${timeframe}`).css('color', 'rgb(6, 103, 208)');

    let granularity = timeframeFunctions.timeGranConverter(timeframe);
    this.retrievePrices(granularity);
  }

  render () {
    let granularity = timeframeFunctions.timeGranConverter(this.state.timeframe);

    return (
      <div className='portfolio-chart-container'>
        {/* <div> */}
          <div className='portfolio-chart-header'>
            <h1>{this.coins[this.coin]}</h1>
            <div className='portfolio-chart-number'>
              <h3>$</h3>
              <h2>0</h2>
              <h3 id='decimal'>.00</h3>
            </div>
          </div>
        {/* </div> */}
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
    );
  }
}

export default AssetChart;
