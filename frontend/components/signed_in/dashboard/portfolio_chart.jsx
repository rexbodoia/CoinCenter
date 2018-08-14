import React from 'react';
import { AreaChart, Area, Line, XAxis, YAxis, Tooltip } from 'recharts';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);

    this.calculateBalanceHistory = this.calculateBalanceHistory.bind(this);
    this.retrieveBalances = this.retrieveBalances.bind(this);
    this.findSelectedTimeframe = this.findSelectedTimeframe.bind(this);
    this.changeTimeframe = this.changeTimeframe.bind(this);
    this.totalData = [];
    this.timeframes = ['day', 'week', 'month', 'year', 'all'];

    this.state = {
      balances: props.balances,
      prices: props.prices,
      id: props.id,
      'day': false,
      'week': false,
      'month': true,
      'year': false,
      'all': false
    }
  }

  componentDidMount() {
    this.balancesInteger = 0;
    this.balancesDecimal = 0;
    this.retrieveBalances();
  }

  findSelectedTimeframe() {
    return this.timeframes.filter(timeframe => this.state[timeframe] == true);
  }

  retrieveBalances() {
    let [selectedTime] = this.findSelectedTimeframe();

    this.props.getBalances(this.props.id).then(() => this.changeTimeframe(selectedTime));
  }

  changeTimeframe(period) {
    let others = this.timeframes.filter(timeframe => timeframe !== period);

    this.setState({
      [period]: true,
      [others[0]]: false,
      [others[1]]: false,
      [others[2]]: false,
      [others[3]]: false
    });

    this.calculateBalanceHistory(period);
  }

  longestBalance(balances) {
    let balanceValues = Object.values(balances);
    let lengths = balanceValues.map(balance => balance.length);

    return Math.max(...lengths);
  }

  calculateBalanceHistory(timeframe) {
    let balances = this.props.balances;

    const longestBalance = this.longestBalance(balances);

    const timeframes = {
      'day': 1,
      'week': 7,
      'month': 30,
      'year': 365,
      'all': longestBalance
    }

    this.totalData = [];

    for (let i = 0; i < timeframes[timeframe]; i++){
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
          <Tooltip labelStyle={{ color: "rgb(125, 149, 182)" }} /*content={<CustomToolTip />}*//>
        </AreaChart>
      );
    }
  }

  render () {
    return (
      <div className='portfolio-chart-container'>
        <div className='portfolio-chart-header'>
          <h1>Your portfolio value</h1>
          <div className='portfolio-chart-number'>
            <h3>$</h3>
            <h2>{this.balancesInteger}</h2>
            <h3>.{this.balancesDecimal}</h3>
          </div>
        </div>
        <ul className='portfolio-chart-time-frames'>
          {/* <li>1H</li> */}
          <li onClick={(e) => this.changeTimeframe('day')}>1D</li>
          <li onClick={(e) => this.changeTimeframe('week')}>1W</li>
          <li onClick={(e) => this.changeTimeframe('month')}>1M</li>
          <li onClick={(e) => this.changeTimeframe('year')}>1Y</li>
          <li onClick={(e) => this.changeTimeframe('all')}>ALL</li>
        </ul>
        {this.renderChart(this.totalData)}
        <div className='portfolio-chart-dates'>
          <ul>
            {/* <li>Feb</li>
            <li>Mar</li>
            <li>Apr</li>
            <li>May</li>
            <li>Jun</li>
            <li>July</li>
            <li>Aug</li> */}
          </ul>
        </div>
      </div>
    );
  }
}

export default PortfolioChart;
