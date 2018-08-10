import AuthForms from './auth_forms';
import { connect } from 'react-redux';
import { signup, signin, clearErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session,
  currentUser: state.entities.users[1]
});

const mapDispatchToProps = dispatch => ({
  signup: currentUser => dispatch(signup(currentUser)),
  signin: currentUser => dispatch(signin(currentUser)),
  demoLogin: demoUser => dispatch(signin(demoUser)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForms);
