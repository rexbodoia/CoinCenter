import { connect } from 'react-redux';
import { fetchPrices } from '../../../actions/prices_actions';
import AssetChart from './asset_chart';

const mapStateToProps = (state, ownProps) => ({
  prices: state.entities.prices,
  coin: ownProps.match.params.symbol
});

const mapDispatchToProps = dispatch => ({
  getPrices: (symbol, granularity) => dispatch(fetchPrices(symbol, granularity))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetChart);
