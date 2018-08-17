import React from 'react';

class BuyForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      coin: 'BTC'
    }
  }

  render() {
    return (
      <form className='buy-sell-form'>
        <input placeholder='0.00                             USD' >
        </input>

        <span className='conversion-symbol'>&#8652;</span>

        <input placeholder={`0.00                               ${this.state.coin}`} >
        </input>
        <input className='buy-sell-button' type='submit' value={`Buy ${this.state.coin}`}></input>
      </form>
    );
  }
}

export default BuyForm;