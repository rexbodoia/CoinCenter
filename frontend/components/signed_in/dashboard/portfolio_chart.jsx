import React from 'react';
import { AreaChart, Area, Tooltip } from 'recharts';
import PortfolioCustomToolTip from './portfolio_custom_tool_tip';
import { calculateCoinValues, findNextTimeIdx, compileBalanceValues, filterPrices } from '../../../util/calculations';
import { timeGranConverter, getTimeframeLength, stringifyDate, changeTimeframe, renderDates } from '../../../util/timeframe_manipulation';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amounts: [],
      id: props.id,
      timeframe: 'month'
    }

    // this.changeTimeframe = this.changeTimeframe.bind(this);
    // this.renderDates = this.renderDates.bind(this);
    // this.retrievePrices = this.retrievePrices.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.calculatePortfolioHistory = this.calculatePortfolioHistory.bind(this);
  }

  componentDidMount() {
    this.props.getTransactions(this.props.id);

      // setTimeout(() => this.props.getPrices('BTC', 'sixHours'), 500);
      // setTimeout(() => this.props.getPrices('BCH', 'sixHours'), 1000);
      // setTimeout(() => this.props.getPrices('ETH', 'sixHours'), 1500);
      // setTimeout(() => this.props.getPrices('LTC', 'sixHours'), 2000);
    if (!Object.keys(this.props.prices).includes('sixHours')) {
      this.retrievePrices();
    };
  }

  retrievePrices() {
    setTimeout(() => this.props.getPrices('BTC', 'sixHours'), 500);

    setTimeout(() => this.props.getPrices('BCH', 'sixHours'), 1000);

    setTimeout(() => this.props.getPrices('ETH', 'sixHours'), 1500);

    setTimeout(() => this.props.getPrices('LTC', 'sixHours'), 2000);
  }

  calculatePortfolioHistory() {
    if (Object.keys(this.props.prices).includes('sixHours') && Object.values(this.props.prices.sixHours).length >= 4 && Object.values(this.props.amounts).length >= 4) {
      // debugger

      let bchData = filterPrices(this.props.prices.sixHours.BCH);
      let btcData = filterPrices(this.props.prices.sixHours.BTC);
      let ethData = filterPrices(this.props.prices.sixHours.ETH);
      let ltcData = filterPrices(this.props.prices.sixHours.LTC);

      let bchValues = calculateCoinValues(this.props.amounts.BCH, bchData);
      let btcValues = calculateCoinValues(this.props.amounts.BTC, btcData);
      let ethValues = calculateCoinValues(this.props.amounts.ETH, ethData);
      let ltcValues = calculateCoinValues(this.props.amounts.LTC, ltcData);

      return compileBalanceValues([bchValues, btcValues, ethValues, ltcValues]);
    }
    return [];
  }

  renderChart() {
    if(Object.keys(this.props.prices).includes('sixHours') && Object.values(this.props.prices.sixHours).length >= 4 && Object.values(this.props.amounts).length >= 4) {
      let data = this.calculatePortfolioHistory();
      if (data.length !== 0) {
        return (
          <AreaChart width={1188} height={160} data={data}>

            <Area type="monotone" dataKey="value" fill="rgb(244, 247, 250)" fillOpacity={1} stroke="rgb(6, 103, 208)" strokeWidth={1.4}/>
            <Tooltip labelStyle={{ color: "rgb(125, 149, 182)" }} content={<PortfolioCustomToolTip />}/>
          </AreaChart>
        );
      }
    }
  }

  render () {
    return (
      <div className='portfolio-chart-container'>
        <div className='portfolio-chart-header'>
          <h1>Your portfolio value</h1>
          <div className='portfolio-chart-number'>
            <h3>$</h3>
            <h2>0</h2>
            <h3 id='decimal'>.00</h3>
          </div>
        </div>
        <ul className='portfolio-chart-time-frames'>
          {/* <li onClick={(e) => this.changeTimeframe('hour')}>1H</li>
          <li onClick={(e) => this.changeTimeframe('day')}>1D</li>
          <li onClick={(e) => this.changeTimeframe('week')}>1W</li>
          <li onClick={(e) => this.changeTimeframe('month')}>1M</li>
          <li onClick={(e) => this.changeTimeframe('year')}>1Y</li>
          <li onClick={(e) => this.changeTimeframe('all')}>ALL</li> */}
        </ul>
        {this.renderChart()}
        <div className='portfolio-chart-dates'>
          <ul>
            {/* {this.renderDates(this.state.timeframe)} */}
          </ul>
        </div>
      </div>
    );
  }
}

export default PortfolioChart;
