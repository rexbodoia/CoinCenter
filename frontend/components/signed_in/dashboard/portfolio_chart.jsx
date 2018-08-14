import React from 'react';
import { AreaChart, Area, Tooltip } from 'recharts';
import PortfolioCustomToolTip from './portfolio_custom_tool_tip';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balances: props.balances,
      prices: props.prices,
      id: props.id,
      timeframe: 'month'
    }

    this.calculateBalanceHistory = this.calculateBalanceHistory.bind(this);
    this.retrieveBalances = this.retrieveBalances.bind(this);
    this.changeTimeframe = this.changeTimeframe.bind(this);
    this.renderDates = this.renderDates.bind(this);
    this.getTimeframeLength = this.getTimeframeLength.bind(this);
    this.totalData = [];
  }

  componentDidMount() {
    this.retrieveBalances();
  }

  changeTimeframe(timeframe) {
    this.setState({ timeframe });
    let length = this.getTimeframeLength(timeframe);
    this.calculateBalanceHistory(length);
  }

  retrieveBalances() {
    this.props.getBalances(this.props.id).then(() => this.changeTimeframe(this.state.timeframe));
  }

  longestBalance(balances) {
    let balanceValues = Object.values(balances);
    let lengths = balanceValues.map(balance => balance.length);
    return Math.max(...lengths);
  }

  getTimeframeLength(timeframe) {
    if (timeframe === 'all') {
      return this.longestBalance(this.state.balances);
    }

    const timeframeLengths = {
      'hour': 0,
      'day': 1,
      'week': 7,
      'month': 30,
      'year': 365
    }
    return timeframeLengths[timeframe];
  }

  calculateBalanceHistory(length) {
    let balances = this.props.balances;
    this.totalData = [];

    for (let i = 0; i < length; i++){
      let amount = balances.bitcoin[i].amount + balances.bitcoinCash[i].amount + balances.ethereum[i].amount + balances.litecoin[i].amount;

      let date = balances.bitcoin[i].date;
      this.totalData.push({date, amount});
    }

    this.setState({ balances })
  }

  renderChart(data) {
    if (data.length !== 0){
      return (
        <AreaChart width={1188} height={160} data={data}>

          <Area type="monotone" dataKey="amount" fill="rgb(244, 247, 250)" fillOpacity={1} stroke="rgb(6, 103, 208)" strokeWidth={1.4}/>
          <Tooltip labelStyle={{ color: "rgb(125, 149, 182)" }} content={<PortfolioCustomToolTip />}/>
        </AreaChart>
      );
    }
  }

  stringifyDate(date) {
    let string = date.toString()
    return [string.slice(4, 7), string.slice(8, 10)];
  }

  renderDates(timeframe) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const today = new Date();
    let stringified = this.stringifyDate(today);

    let length = this.getTimeframeLength(timeframe);
    let intervalLength = Math.ceil(length / 7);

    $('.portfolio-chart-dates').find('ul').empty();
    $('.portfolio-chart-dates').find('ul').prepend(`<li>${stringified[0]} ${stringified[1]}</li>`);

    for (let i = 0; i < 6; i++) {
      let nextDate = new Date(today.setDate(today.getDate() - intervalLength));
      let stringified = this.stringifyDate(nextDate);

      $('.portfolio-chart-dates').find('ul').prepend(`<li>${stringified[0]} ${stringified[1]}</li>`);
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
          <li onClick={(e) => this.changeTimeframe('hour')}>1H</li>
          <li onClick={(e) => this.changeTimeframe('day')}>1D</li>
          <li onClick={(e) => this.changeTimeframe('week')}>1W</li>
          <li onClick={(e) => this.changeTimeframe('month')}>1M</li>
          <li onClick={(e) => this.changeTimeframe('year')}>1Y</li>
          <li onClick={(e) => this.changeTimeframe('all')}>ALL</li>
        </ul>
        {this.renderChart(this.totalData)}
        <div className='portfolio-chart-dates'>
          <ul>
            {this.renderDates(this.state.timeframe)}
          </ul>
        </div>
      </div>
    );
  }
}

export default PortfolioChart;
