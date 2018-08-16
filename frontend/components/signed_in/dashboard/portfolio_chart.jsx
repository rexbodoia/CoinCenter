import React from 'react';
import { AreaChart, Area, Tooltip, YAxis } from 'recharts';
import PortfolioCustomToolTip from './portfolio_custom_tool_tip';
import { calculateCoinValues, findNextTimeIdx, compileBalanceValues, filterPrices } from '../../../util/calculations';
import { timeGranConverter, getTimeframeLength, stringifyDate, changeTimeframe, renderDates } from '../../../util/timeframe_manipulation';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeframe: 'month'
    }

    // this.renderDates = this.renderDates.bind(this);
    this.retrievePrices = this.retrievePrices.bind(this);
    this.changeTimeframe = this.changeTimeframe.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.calculatePortfolioHistory = this.calculatePortfolioHistory.bind(this);
  }

  componentDidMount() {
    this.props.getTransactions(this.props.id);
    this.retrievePrices('sixHours');
  }

  retrievePrices(granularity) {
    if (!Object.keys(this.props.prices).includes(granularity)) {
      this.props.getPrices('BTC', granularity);
      setTimeout(() => this.props.getPrices('BCH', granularity), 400);
      setTimeout(() => this.props.getPrices('ETH', granularity), 800);
      setTimeout(() => this.props.getPrices('LTC', granularity), 1200);
    }
  }

  calculatePortfolioHistory(granularity) {
    if (Object.keys(this.props.prices).includes(granularity) && Object.values(this.props.prices[granularity]).length >= 4 && Object.values(this.props.amounts).length >= 4) {
      let timeframe = this.state.timeframe;
      let length = getTimeframeLength(timeframe);
      // let granularity = timeGranConverter(timeframe);

      let bchData = filterPrices(this.props.prices[granularity].BCH, length);
      let btcData = filterPrices(this.props.prices[granularity].BTC, length);
      let ethData = filterPrices(this.props.prices[granularity].ETH, length);
      let ltcData = filterPrices(this.props.prices[granularity].LTC, length);

      let bchValues = calculateCoinValues(this.props.amounts.BCH, bchData);
      let btcValues = calculateCoinValues(this.props.amounts.BTC, btcData);
      let ethValues = calculateCoinValues(this.props.amounts.ETH, ethData);
      let ltcValues = calculateCoinValues(this.props.amounts.LTC, ltcData);

      return compileBalanceValues([bchValues, btcValues, ethValues, ltcValues]);
    }
    return [];
  }

  renderChart(granularity) {
    if(Object.keys(this.props.prices).includes(granularity) && Object.values(this.props.prices[granularity]).length >= 4 && Object.values(this.props.amounts).length >= 4) {

      let data = this.calculatePortfolioHistory(granularity);
      if (data.length !== 0) {
        return (
          <AreaChart width={1188} height={160} data={data}>

            <Area type="monotone" dataKey="value" fill="rgb(244, 247, 250)" fillOpacity={1} stroke="rgb(6, 103, 208)" strokeWidth={1.4}/>
            <YAxis hide={true} domain={[dataMin => dataMin, dataMax => dataMax]} />
            <Tooltip labelStyle={{ color: "rgb(125, 149, 182)" }} content={<PortfolioCustomToolTip />}/>
          </AreaChart>
        );
      }
    }
  }

  changeTimeframe(timeframe) {
    this.setState({ timeframe });
    let granularity = timeGranConverter(timeframe);
    this.retrievePrices(granularity);
  }

  render () {
    let granularity = timeGranConverter(this.state.timeframe);

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
          <li onClick={(e) => this.changeTimeframe('hour')}>1H</li>
          <li onClick={(e) => this.changeTimeframe('day')}>1D</li>
          <li onClick={(e) => this.changeTimeframe('week')}>1W</li>
          <li onClick={(e) => this.changeTimeframe('month')}>1M</li>
          <li onClick={(e) => this.changeTimeframe('year')}>1Y</li>
          <li onClick={(e) => this.changeTimeframe('all')}>ALL</li>
        </ul>
        {this.renderChart(granularity)}
        <div className='portfolio-chart-dates'>
          <ul>
            {renderDates(this.state.timeframe)}
          </ul>
        </div>
      </div>
    );
  }
}

export default PortfolioChart;
