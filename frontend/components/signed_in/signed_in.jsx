import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import NavHeaderContainer from './navigation/nav_header_container';
import ChartsContainer from '../charts/charts_container';
import DashboardContainer from './dashboard/dashboard_container';
import AssetChartContainer from './assets/asset_chart_container';

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
        </Switch>
      </div>
    );
  }
}

export default withRouter(SignedIn);
