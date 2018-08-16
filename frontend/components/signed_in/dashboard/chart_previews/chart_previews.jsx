import React from 'react';
import ChartPreviewItem from './chart_preview_item';
import { filterPrices } from '../../../../util/calculations';

class ChartPreviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if (Object.keys(this.props.prices).includes('oneHour') && Object.values(this.props.prices.oneHour).length >= 4) {

      let prices = this.props.prices.oneHour;

      const btcPrices = filterPrices(prices.BTC, 24);
      const bchPrices = filterPrices(prices.BCH, 24);
      const ethPrices = filterPrices(prices.ETH, 24);
      const ltcPrices = filterPrices(prices.LTC, 24);
      
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
