import React from 'react';
import ChartPreviewItem from './chart_preview_item';

class ChartPreviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prices: null
    }
  }

  componentDidMount() {
    this.props.getPrices().then(prices => this.setState({ prices }));
  }

  render () {
    if(!this.state.prices){
      return (
        <div className='chart-previews-container'>
          <div className='chart-preview-container'></div>
          <div className='chart-preview-container'></div>
          <div className='chart-preview-container'></div>
          <div className='chart-preview-container'></div>
        </div>
      );
    } else {
      return (
        <div className='chart-previews-container'>
          <ChartPreviewItem coin={'Bitcoin'} prices={this.props.prices.bitcoin} />
          <ChartPreviewItem coin={'Bitcoin Cash'} prices={this.props.prices.bitcoinCash} />
          <ChartPreviewItem coin={'Ethereum'} prices={this.props.prices.ethereum} />
          <ChartPreviewItem coin={'Litecoin'} prices={this.props.prices.litecoin} />
        </div>
      );
    }
  }
}

export default ChartPreviews;
