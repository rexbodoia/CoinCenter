import { connect } from 'react-redux';
import { sendTransaction, fetchTransactions } from '../../../../actions/transactions_actions';
import BuySellForm from './buy_sell_form';

const mapStateToProps = (state, ownProps) => ({
  user_id: state.session.id,
  action: ownProps.action
})

const mapDispatchToProps = dispatch => ({
  sendTransaction: transaction => dispatch(sendTransaction(transaction)),
  getTransactions: user_id => dispatch(fetchTransactions(user_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuySellForm);
