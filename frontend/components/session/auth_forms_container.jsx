import AuthForms from './auth_forms';
import { connect } from 'react-redux';
import { signup, signin, clearErrors } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
    errors: state.errors.session,
    currentUser: state.entities.users[1],
    email: ownProps.email
});

const mapDispatchToProps = dispatch => ({
  signup: currentUser => dispatch(signup(currentUser)),
  signin: currentUser => dispatch(signin(currentUser)),
  demoLogin: demoUser => dispatch(signin(demoUser)),
  clearErrors: () => dispatch(clearErrors())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthForms));
