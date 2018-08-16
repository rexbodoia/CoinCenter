import React from 'react';
import ChartPreviewItem from './chart_preview_item';
import { filterPrices } from '../../../../util/calculations';

class ChartPreviews extends React.Component {
  constructor(props) {
    super(props);

    // this.redirect = this.redirect.bind(this);
  }

  // redirect(coin) {
  //   return (e) => {
  //     this.props.history.push(`/assets/${coin}`);
  //   }
  // }

  render () {
    if (Object.keys(this.props.prices).includes('oneHour') && Object.values(this.props.prices.oneHour).length >= 4) {

      let prices = this.props.prices.oneHour;

      const btcPrices = filterPrices(prices.BTC, 24);
      const bchPrices = filterPrices(prices.BCH, 24);
      const ethPrices = filterPrices(prices.ETH, 24);
      const ltcPrices = filterPrices(prices.LTC, 24);

      return (
        <div className='chart-previews-container'>
          {/* <div onClick={this.redirect('BTC')}> */}
            <ChartPreviewItem coin={'Bitcoin'} prices={btcPrices} history={this.props.history} />
          {/* </div> */}
          {/* <div onClick={this.redirect('BCH')}> */}
            <ChartPreviewItem coin={'Bitcoin Cash'} prices={bchPrices} history={this.props.history} />
          {/* </div>
          <div onClick={this.redirect('ETH')}> */}
            <ChartPreviewItem coin={'Ehtereum'} prices={ethPrices} history={this.props.history} />
          {/* </div>
          <div onClick={this.redirect('LTC')}> */}
            <ChartPreviewItem coin={'Litecoin'} prices={ltcPrices} history={this.props.history} />
          {/* </div> */}
        </div>
      );
    } else {
      return (
        <div className='chart-previews-container'>
          <div className='chart-preview-container'></div>
          <div className='chart-preview-container'></div>
          <div className='chart-preview-container'></div>
          <div className='chart-preview-container'></div>
        </div>
      );
    }
  }
}

export default ChartPreviews;
