import React from 'react';
import { AreaChart, Area, Tooltip } from 'recharts';
import PortfolioCustomToolTip from './portfolio_custom_tool_tip';
import { calculateCoinValues, findNextTimeIdx, compileBalanceValues, filterPrices, TimeframeToGranularity, getTimeframeLength } from '../../../util/calculations';

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
    this.retrievePrices = this.retrievePrices.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.calculatePortfolioHistory = this.calculatePortfolioHistory.bind(this);
  }

  componentDidMount() {
    this.props.getTransactions(this.props.id).then(transactions => {
      this.setState({ amounts: transactions.transactions });
      this.retrievePrices();
    });
  }

  retrievePrices() {
    setTimeout(() => this.props.getPrices('BTC', 'sixHours').then(btcPrices => this.setState({ btcPrices: btcPrices.prices })), 500);

    setTimeout(() => this.props.getPrices('BCH', 'sixHours').then(bchPrices => this.setState({ bchPrices: bchPrices.prices })), 1000);

    setTimeout(() => this.props.getPrices('ETH', 'sixHours').then(ethPrices => this.setState({ ethPrices: ethPrices.prices })), 1500);

    setTimeout(() => this.props.getPrices('LTC', 'sixHours').then(ltcPrices => this.setState({ ltcPrices: ltcPrices.prices })), 2000);
  }

  // changeTimeframe(timeframe) {
  //   this.setState({ timeframe });
  //   let granularity = TimeframeToGranularity(timeframe);
  //   let amounts = calculateBalanceAmounts(this.props.transactions);
  //   console.log(amounts);
  //   let values = calculateBalanceValues(amounts, this.props.prices);
  //   this.totalData = values;
  // }

  calculatePortfolioHistory() {
    if (Object.values(this.props.prices.sixHours).length >= 4) {
      let bchData = filterPrices(this.props.prices.sixHours.BCH);
      let btcData = filterPrices(this.props.prices.sixHours.BTC);
      let ethData = filterPrices(this.props.prices.sixHours.ETH);
      let ltcData = filterPrices(this.props.prices.sixHours.LTC);

      let bchValues = calculateCoinValues(this.state.amounts.BCH, bchData);
      let btcValues = calculateCoinValues(this.state.amounts.BTC, btcData);
      let ethValues = calculateCoinValues(this.state.amounts.ETH, ethData);
      let ltcValues = calculateCoinValues(this.state.amounts.LTC, ltcData);

      return compileBalanceValues([bchValues, btcValues, ethValues, ltcValues]);
    }
    return [];
  }

  renderChart() {
    if(Object.values(this.props.prices).length !== 0) {
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

  // stringifyDate(date) {
  //   let string = date.toString()
  //   return [string.slice(4, 7), string.slice(8, 10)];
  // }
  //
  // renderDates(timeframe) {
  //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //
  //   const today = new Date();
  //   let stringified = this.stringifyDate(today);
  //
  //   let length = getTimeframeLength(timeframe);
  //   let intervalLength = Math.ceil(length / 7);
  //
  //   $('.portfolio-chart-dates').find('ul').empty();
  //   $('.portfolio-chart-dates').find('ul').prepend(`<li>${stringified[0]} ${stringified[1]}</li>`);
  //
  //   for (let i = 0; i < 6; i++) {
  //     let nextDate = new Date(today.setDate(today.getDate() - intervalLength));
  //     let stringified = this.stringifyDate(nextDate);
  //
  //     $('.portfolio-chart-dates').find('ul').prepend(`<li>${stringified[0]} ${stringified[1]}</li>`);
  //   }
  // }

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
