import { connect } from 'react-redux';
import { fetchPrices } from '../../../actions/prices_actions';
import Dashboard from './dashboard';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  transactions: state.entities.transactions,
  prices: state.entities.prices
});

const mapDispatchToProps = dispatch => ({
  getPrices: () => dispatch(fetchPrices())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
