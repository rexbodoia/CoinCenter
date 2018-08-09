import { Redirect, Route, withRouter } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';

const Protected = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/signin" />
    )
  )}/>
);

const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.id)};
};

export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
