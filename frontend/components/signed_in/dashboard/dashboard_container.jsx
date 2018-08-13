import { connect } from 'react-redux';
import { fetchBalances } from '../../../actions/balances_actions';
import Dashboard from './dashboard';

const mapStateToProps = state => ({
  balances: state.entities.balances
});

const mapDispatchToProps = dispatch => ({
  getBalances: (id) => dispatch(fetchBalances(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
