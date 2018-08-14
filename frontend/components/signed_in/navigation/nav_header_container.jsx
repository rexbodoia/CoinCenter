import NavHeader from './nav_header';
import { connect } from 'react-redux';
import { logout } from '../../../actions/session_actions';

const mapStateToProps = state => ({
  user: state.entities.users[state.session.id]
})

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);
