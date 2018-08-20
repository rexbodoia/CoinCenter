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
      'ETH': 1,
      'BCH': 2,
      'LTC': 3,
      'BTC': 4
    }

    this.submitForm = this.submitForm.bind(this);
    this.update = this.update.bind(this);
    this.convert = this.convert.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    let amount = this.state.amount;

    if (amount === 0) {
      return null;
    }

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

  convert(dollars) {
    if(Object.keys(this.props.prices.oneHour).includes(this.state.coin)){
      return dollars / this.props.prices.oneHour[this.state.coin][0][3];
    } else {
      return 0;
    }
  }

  update(e) {
    if (!isNaN(parseFloat(e.target.value))) {
      this.setState({ amount: this.convert(parseFloat(e.target.value)) });
    }
  }

  render() {
    return (
      <form className='buy-sell-form' onSubmit={this.submitForm}>
        <input onChange={this.update} placeholder='0.00                                USD' >
        </input>

        <span className='conversion-symbol'>&#8652;</span>

        <input placeholder={`${this.convert(this.state.amount).toFixed(8)}                    ${this.state.coin}`} >
        </input>
        <input className='buy-sell-button' type='submit' value={`${this.props.action} ${this.state.coin}`}></input>
      </form>
    );
  }
}

export default BuySellForm;
