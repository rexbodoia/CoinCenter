import React from 'react';
import PortfolioChart from './portfolio_chart';
import PortfolioChartContainer from './portfolio_chart_container';
import ChartPreviewsContainer from './chart_previews/chart_previews_container';
import Portfolio from './portfolio/portfolio';
import BuySell from './buy_sell/buy_sell';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className='dashboard-background'>
        <PortfolioChartContainer />
        <ChartPreviewsContainer />
        <div className='dashboard-bottom'>
          <Portfolio prices={this.props.prices} transactions={this.props.transactions}/>
          <BuySell />
        </div>
      </div>
    );
  }
}

export default Dashboard;
