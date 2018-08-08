import SignupForm from './signup_form';
import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';

const mapStateToProps = state => ({
  errors: Object.values(state.errors),
  currentUser: state.entities.users[1]
});

const mapDispatchToProps = dispatch => ({
  processForm: currentUser => dispatch(signup(currentUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
