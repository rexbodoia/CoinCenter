import React from 'react';
import PortfolioChart from './portfolio_chart';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getBalances(getState().session.id);
    // if (Object.values(getState().entities.prices).length === 0) {
    //   this.props.getPrices();
    // }
    // this.props.getPrices();
  }

  render(){
    console.log(getState().entities);
    let balances = getState().entities.balances
    let prices = getState().entities.prices
    return (
      <PortfolioChart balances={balances} prices={prices}/>
    );
  }
}

export default Dashboard;
