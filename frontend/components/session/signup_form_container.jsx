import SignupForm from './signup_form';
import { connect } from 'react-redux';
import { signup, signin, clearErrors } from '../../actions/session_actions';

const mapStateToProps = state => ({
  errors: state.errors.session,
  currentUser: state.entities.users[1]
});

const mapDispatchToProps = dispatch => ({
  processForm: currentUser => dispatch(signup(currentUser)),
  demoLogin: demoUser => dispatch(signin(demoUser)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
