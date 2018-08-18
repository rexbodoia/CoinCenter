import React from 'react';
import { AreaChart, Area, Tooltip, YAxis } from 'recharts';
import PortfolioCustomToolTip from './portfolio_custom_tool_tip';
import { calculateCoinValues, findNextTimeIdx, compileBalanceValues, filterPrices, calculateNetCoinAmounts } from '../../../util/calculations';
import * as timeframeFunctions from '../../../util/timeframe_manipulation';
import { ClipLoader } from 'react-spinners';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeframe: 'month'
    }

    this.retrievePrices = this.retrievePrices.bind(this);
    this.changeTimeframe = this.changeTimeframe.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.calculationHelper = this.calculationHelper.bind(this);
    this.calculatePortfolioHistory = this.calculatePortfolioHistory.bind(this);
  }

  componentDidMount() {
    $('#month').css('color', 'rgb(6, 103, 208)');
    this.props.getTransactions(this.props.id);
    this.retrievePrices('sixHours');
  }

  retrievePrices(granularity) {
    if (Object.values(this.props.prices.oneHour).length < 4) {
      this.props.getPrices('BTC', granularity)
        .then(() => setTimeout(() => this.props.getPrices('BTC', 'oneHour')
        .then(() => setTimeout(() => this.props.getPrices('BCH', granularity)
        .then(() => setTimeout(() => this.props.getPrices('BCH', 'oneHour')
        .then(() => setTimeout(() => this.props.getPrices('ETH', granularity)
        .then(() => setTimeout(() => this.props.getPrices('ETH', 'oneHour')
        .then(() => setTimeout(() => this.props.getPrices('LTC', granularity)
        .then(() => setTimeout(() => this.props.getPrices('LTC', 'oneHour'), 334)), 334)), 334)), 334)), 334)), 334)), 334));
    } else if (Object.values(this.props.prices[granularity]).length < 4) {
        this.props.getPrices('BTC', granularity)
          .then(() => setTimeout(() => this.props.getPrices('BCH', granularity)
          .then(() => setTimeout(() => this.props.getPrices('ETH', granularity)
          .then(() => setTimeout(() => this.props.getPrices('LTC', granularity), 334)), 334)), 334));
    }
  }

  calculationHelper(granularity, length){
    const coins = ['BCH', 'BTC', 'ETH', 'LTC'];
    let values = [];
    for (let i = 0; i < coins.length - 1; i++) {
      let prices = filterPrices(this.props.prices[granularity][coins[i]], length);
      let amounts = calculateNetCoinAmounts(this.props.amounts[coins[i]]);
      values.push(calculateCoinValues(amounts, prices));
    }
    return values;
  }

  calculatePortfolioHistory(granularity) {
    if (Object.values(this.props.prices[granularity]).length >= 4 && Object.values(this.props.amounts).length >= 4) {
      let length = timeframeFunctions.findNumDataPoints(this.state.timeframe);

      return compileBalanceValues(this.calculationHelper(granularity, length));
    }
    return [];
  }

  renderChart(granularity) {
    if(Object.values(this.props.prices[granularity]).length >= 4 && Object.values(this.props.amounts).length >= 4) {

      let data = this.calculatePortfolioHistory(granularity);
      if (data.length >= 0) {
        return (
          <AreaChart width={1188} height={160} data={data}>

            <Area type="monotone" dataKey="value" fill="rgb(244, 247, 250)" fillOpacity={1} stroke="rgb(6, 103, 208)" strokeWidth={1.4}/>
            <YAxis hide={true} domain={[dataMin => dataMin, dataMax => dataMax]} />
            <Tooltip labelStyle={{ color: "rgb(125, 149, 182)" }} content={<PortfolioCustomToolTip />}/>
          </AreaChart>
        );
      }
    } else {
      return (
        <div style={{ height: 160 }}>
          <ClipLoader
            className='spinner'
            sizeUnit={"px"}
            size={70}
            color={'rgb(155, 166, 178)'}
          />
        </div>
      )
    }
  }

  changeTimeframe(timeframe) {
    $(`#${this.state.timeframe}`).css('color', 'rgb(155, 166, 178)');
    this.setState({ timeframe });
    $(`#${timeframe}`).css('color', 'rgb(6, 103, 208)');

    let granularity = timeframeFunctions.timeGranConverter(timeframe);
    this.retrievePrices(granularity);
  }

  renderTimeframe(timeframe) {
    const timeframeAbbrevs = {
      'hour': '1H',
      'day': '1D',
      'week': '1W',
      'month': '1M',
      'year': '1Y'
    }

    if (this.state.timeframe === timeframe) {
      return (
        <li onClick={(e) => this.changeTimeframe(timeframe)} className='selected-timeframe'>{timeframeAbbrevs[timeframe]}</li>
      );
    } else {
      return (
        <li onClick={(e) => this.changeTimeframe(timeframe)} className='unselected-timeframe'>{timeframeAbbrevs[timeframe]}</li>
      );
    }
  }

  render () {
    let granularity = timeframeFunctions.timeGranConverter(this.state.timeframe);

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
          {this.renderTimeframe('hour')}
          {this.renderTimeframe('day')}
          {this.renderTimeframe('week')}
          {this.renderTimeframe('month')}
          {this.renderTimeframe('year')}
        </ul>
        {this.renderChart(granularity)}
        <div className='portfolio-chart-dates'>
          <ul>
            {timeframeFunctions.renderDates(this.state.timeframe, '.portfolio-chart-dates')}
          </ul>
        </div>
      </div>
    );
  }
}

export default PortfolioChart;
