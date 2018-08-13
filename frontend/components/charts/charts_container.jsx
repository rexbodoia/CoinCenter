import { connect } from 'react-redux';
import { fetchPrices } from '../../actions/prices_actions';
import Chart from './chart';

const mapStateToProps = state => ({
  prices: state.entities.prices
});

const mapDispatchToProps = dispatch => ({
  getPrices: () => dispatch(fetchPrices())
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
