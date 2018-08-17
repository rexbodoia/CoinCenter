import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import NavHeaderContainer from './navigation/nav_header_container';
import DashboardContainer from './dashboard/dashboard_container';
import AssetChartContainer from './assets/asset_chart_container';
import BuySell from './dashboard/buy_sell/buy_sell';

class SignedIn extends React.Component {
  constructor(props) {
    super(props);
    // console.log(getState().session.id);
  }

  render () {
    return (
      <div>
        <NavHeaderContainer />
        {/* <ChartsContainer /> */}
        <Switch>
          <Route path='/assets/:symbol' component={AssetChartContainer} />
          <Route path='/dashboard' component={DashboardContainer} />
          <Route path='/buy' component={BuySell} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(SignedIn);
