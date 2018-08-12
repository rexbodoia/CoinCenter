import { connect } from 'react-redux';
import { fetchPrices } from '../../actions/prices_actions';
import Chart from './chart';

// const mapStateToProps = state => ({
//
// });

const mapDispatchToProps = dispatch => ({
  getPrices: () => dispatch(fetchPrices())
});

export default connect(null, mapDispatchToProps)(Chart);
