import React from 'react';
import ChartPreviewItem from './chart_preview_item';
import { filterPrices } from '../../../../util/calculations';

class ChartPreviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if (Object.keys(this.props.prices).includes('fifteenMinutes') && Object.values(this.props.prices.fifteenMinutes).length >= 4) {

      let prices = this.props.prices.fifteenMinutes;

      const btcPrices = filterPrices(prices.BTC);
      const bchPrices = filterPrices(prices.BCH);
      const ethPrices = filterPrices(prices.ETH);
      const ltcPrices = filterPrices(prices.LTC);
      return (
        <div className='chart-previews-container'>
          <ChartPreviewItem coin={'Bitcoin'} prices={btcPrices} />
          <ChartPreviewItem coin={'Bitcoin Cash'} prices={bchPrices} />
          <ChartPreviewItem coin={'Ethereum'} prices={ethPrices} />
          <ChartPreviewItem coin={'Litecoin'} prices={ltcPrices} />
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
