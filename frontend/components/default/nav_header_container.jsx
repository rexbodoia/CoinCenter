import NavHeader from './nav_header';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

// const mapStateToProps = state => ({
//
// });

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(NavHeader);
