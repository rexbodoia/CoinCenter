import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import NavHeaderContainer from './navigation/nav_header_container';
import ChartsContainer from '../charts/charts_container';
import DashboardContainer from './dashboard/dashboard_container';

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
        <Route path='/dashboard' component={DashboardContainer} />
      </div>
    );
  }
}

export default withRouter(SignedIn);
