import React from 'react';
import { withRouter } from 'react-router-dom';
import NavHeaderContainer from '../navigation/nav_header_container';
import ChartsContainer from '../charts/charts_container';

class SignedIn extends React.Component {
  render () {
    return (
      <div>
        <NavHeaderContainer />
        <ChartsContainer />
      </div>
    );
  }
}

export default withRouter(SignedIn);
