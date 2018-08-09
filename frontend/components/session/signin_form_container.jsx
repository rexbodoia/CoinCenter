import SigninForm from './signin_form';
import { connect } from 'react-redux';
import { signin, clearErrors } from '../../actions/session_actions';

const mapStateToProps = state => ({
  errors: state.errors.session,
  currentUser: state.entities.users[1]
});

const mapDispatchToProps = dispatch => ({
  processForm: currentUser => dispatch(signin(currentUser)),
  demoLogin: demoUser => dispatch(signin(demoUser)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
