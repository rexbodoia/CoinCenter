import React from 'react';
import PortfolioChart from './portfolio_chart';
import PortfolioChartContainer from './portfolio_chart_container';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (Object.values(this.props.prices).length !== 0) {
      let prices = this.props.prices
    } else {
      this.props.getPrices();
    }
    if (Object.values(this.props.balances).length !== 0) {
      let balances = this.props.balances
    } else {
      this.props.getBalances(getState().session.id);
    }
  }

  render(){
    let prices = getState().entities.prices;
    let balances = getState().entities.balances;
    return (
      <PortfolioChartContainer balances={balances} prices={prices}/>
    );
  }
}

export default Dashboard;
