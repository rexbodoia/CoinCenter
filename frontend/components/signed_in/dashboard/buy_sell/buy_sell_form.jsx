import React from 'react';

class BuySellForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      coin: 'BTC',
      action: props.action,
      amount: 0,

    }

    this.coin_ids = {
      'ETH': 0,
      'BCH': 1,
      'LTC': 2,
      'BTC': 3
    }

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    let amount = this.state.amount;

    if (this.state.action === 'Sell') {
      amount = 0 - amount;
    }

    let transaction = {
      date: new Date(),
      coin_id: this.coin_ids[this.state.coin],
      user_id: this.props.user_id,
      amount
    };

    this.props.sendTransaction(transaction).then(() => this.props.getTransactions(this.props.user_id))
  }

  update(e) {
    this.setState({ amount: e.target.value });
  }

  render() {
    return (
      <form className='buy-sell-form' onSubmit={this.submitForm}>
        <input placeholder='0.00                             USD' >
        </input>

        <span className='conversion-symbol'>&#8652;</span>

        <input placeholder={`${this.state.amount}                               ${this.state.coin}`} >
        </input>
        <input className='buy-sell-button' type='submit' value={`${this.props.action} ${this.state.coin}`}></input>
      </form>
    );
  }
}

export default BuySellForm;
