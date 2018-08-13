import { connect } from 'react-redux';
import { fetchBalances } from '../../../actions/balances_actions';
import { fetchPrices } from '../../../actions/prices_actions';
import Dashboard from './dashboard';

const mapStateToProps = state => ({
  balances: state.entities.balances
});

const mapDispatchToProps = dispatch => ({
  getBalances: (id) => dispatch(fetchBalances(id)),
  getPrices: () => dispatch(fetchPrices())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
