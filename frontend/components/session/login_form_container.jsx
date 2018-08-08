import LoginForm from './login_form';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';

const mapStateToProps = state => ({
  errors: Object.values(state.errors)
});

const mapDispatchToProps = dispatch => ({
  processForm: currentUser => dispatch(login(currentUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
