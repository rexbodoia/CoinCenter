import { connect } from 'react-redux';
import { fetchBalances } from '../../../actions/balances_actions';
import { fetchPrices } from '../../../actions/prices_actions';
import { fetchTransactions } from '../../../actions/transactions_actions';
import PortfolioChart from './portfolio_chart';

const mapStateToProps = (state, ownProps) => ({
  prices: state.entities.prices,
  balances: state.entities.balances,
  amounts: state.entities.transactions,
  id: state.session.id
});

const mapDispatchToProps = dispatch => ({
  getBalances: (id) => dispatch(fetchBalances(id)),
  getTransactions: (id) => dispatch(fetchTransactions(id)),
  getPrices: (symbol, granularity) => dispatch(fetchPrices(symbol, granularity))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioChart);
