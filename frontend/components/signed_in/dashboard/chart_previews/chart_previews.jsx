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
    // .then(() => {
    //   this.renderChart('bitcoin');
    //   this.renderChart('bitcoinCash');
    //   this.renderChart('ehtereum');
    //   this.renderChart('litecoin');
    // });
  }

  render () {
    if(!this.state.prices){
      console.log('hello');
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
          <ChartPreviewItem coin={'bitcoin'} prices={this.state.prices.bitcoin} />
          <ChartPreviewItem coin={'bitcoinCash'} prices={this.props.prices.bitcoinCash} />
          <ChartPreviewItem coin={'ethereum'} prices={this.state.prices.ethereum} />
          <ChartPreviewItem coin={'litecoin'} prices={this.state.prices.litecoin} />
        </div>
      );
    }
  }
}

export default ChartPreviews;
