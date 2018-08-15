import { connect } from 'react-redux';
import { fetchPrices } from '../../../../actions/prices_actions';
import ChartPreviews from './chart_previews';

const mapDispatchToProps = dispatch => ({
  getPrices: (symbol, granularity) => dispatch(fetchPrices(symbol, granularity))
});

export default connect(null, mapDispatchToProps)(ChartPreviews);
