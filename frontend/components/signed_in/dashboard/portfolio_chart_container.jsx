import { connect } from 'react-redux';
import { fetchBalances } from '../../../actions/balances_actions';
import { fetchPrices } from '../../../actions/prices_actions';
import PortfolioChart from './portfolio_chart';

const mapStateToProps = (state, ownProps) => ({
  prices: ownProps.prices,
  balances: ownProps.balances
});

const mapDispatchToProps = dispatch => ({
  getBalances: (id) => dispatch(fetchBalances(id)),
  getPrices: () => dispatch(fetchPrices())
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioChart);