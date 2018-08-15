import { connect } from 'react-redux';
import SplashPage from './splash_page';
import { fetchPrices } from '../../actions/prices_actions';

const mapStateToProps = state => ({
  prices: state.entities.prices
});

const mapDispatchToProps = dispatch => ({
  getPrices: (symbol, granularity) => dispatch(fetchPrices(symbol, granularity))
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);
