import { connect } from 'react-redux';
import SplashPage from './splash_page';
import { fetchPrices } from '../../actions/prices_actions';

const mapStateToProps = state => ({
  prices: state.entities.prices
});

const mapDispatchToProps = dispatch => ({
  getPrices: () => dispatch(fetchPrices())
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);
