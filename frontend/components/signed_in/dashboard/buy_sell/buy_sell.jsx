import React from 'react';
import BuyForm from './buy_form';
import SellForm from './sell_form';
import BuySellFormIcon from './buy_sell_form_icon';

class BuySell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'Buy'
    }

    this.selectTab = this.selectTab.bind(this);
    this.renderTab = this.renderTab.bind(this);
    this.renderForms = this.renderForms.bind(this);
  }

  selectTab(tab) {
    return (e) => {
      this.setState({ tab })
    }
  }

  renderTab(tab) {
    if (this.state.tab === tab) {
      return (
        <div className='selected-portfolio-tab'><span onClick={this.selectTab(tab)}>{tab}</span></div>
      );
    } else {
      return (
        <div className='unselected-portfolio-tab'><span onClick={this.selectTab(tab)}>{tab}</span></div>
      );
    }
  }

  renderForms() {
    if (this.state.tab === 'Buy') {
      return (
        <BuyForm />
      );
    } else {
      return (
        <SellForm />
      );
    }
  }

  render() {
    return (
      <div className='buy-sell-container'>
        <div className='buy-sell-header'>
          <div className='portfolio-left'><h1>Buy/Sell</h1></div>
          <div className='portfolio-tabs'>
            {this.renderTab('Buy')}
            <div className='portfolio-empty-div'></div>
            {this.renderTab('Sell')}
            <div className='portfolio-empty-div' style={{ paddingRight: 8 }}></div>
          </div>
        </div>
        <div className='buy-sell-icons'>
          <BuySellFormIcon coin='Bitcoin' symbol='BTC' />
          <BuySellFormIcon coin='Bitcoin Cash' symbol='BCH' />
          <BuySellFormIcon coin='Ethereum' symbol='ETH' />
          <BuySellFormIcon coin='Litecoin' symbol='LTC' />
        </div>
        <div className='form-container'>
          {this.renderForms()}
        </div>
      </div>
    );
  }
}

export default BuySell;
