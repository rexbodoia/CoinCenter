import React from 'react';
import PortfolioChart from './portfolio_chart';
import PortfolioChartContainer from './portfolio_chart_container';
import ChartPreviews from './chart_previews/chart_previews';
import Portfolio from './portfolio/portfolio';
import RecentActivity from './recent_activity/recent_activity';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className='dashboard-background'>
        <PortfolioChartContainer />
        <ChartPreviews />
        <div className='dashboard-bottom'>
          <Portfolio />
          <RecentActivity />
        </div>
      </div>
    );
  }
}

export default Dashboard;
