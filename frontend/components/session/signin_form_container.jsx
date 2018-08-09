import SigninForm from './signin_form';
import { connect } from 'react-redux';
import { signin } from '../../actions/session_actions';

const mapStateToProps = state => ({
  errors: state.errors.session,
  currentUser: state.entities.users[1]
});

const mapDispatchToProps = dispatch => ({
  processForm: currentUser => dispatch(signin(currentUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
