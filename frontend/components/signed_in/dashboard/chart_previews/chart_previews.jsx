import React from 'react';
import ChartPreviewItem from './chart_preview_item';

class ChartPreviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btcPrices: null,
      bchPrices: null,
      ethPrices: null,
      ltcPrices: null,
    }
  }

  componentDidMount() {
    this.props.getPrices('BTC', 'fiveMinutes').then(btcPrices => this.setState({ btcPrices: btcPrices.prices }));

    setTimeout(() => this.props.getPrices('BCH', 'fiveMinutes').then(bchPrices => this.setState({ bchPrices: bchPrices.prices })), 200);

    setTimeout(() => this.props.getPrices('ETH', 'fiveMinutes').then(ethPrices => this.setState({ ethPrices: ethPrices.prices })), 200);

    setTimeout(() => this.props.getPrices('LTC', 'fiveMinutes').then(ltcPrices => this.setState({ ltcPrices: ltcPrices.prices })), 200);
  }

  filterPrices(prices) {
    return prices.map(subArray => ({ time: subArray[0], price: subArray[3] })).reverse();
  }

  render () {
    if(this.state.btcPrices && this.state.bchPrices && this.state.ethPrices && this.state.ltcPrices){
      const btcPrices = this.filterPrices(this.state.btcPrices);
      const bchPrices = this.filterPrices(this.state.bchPrices);
      const ethPrices = this.filterPrices(this.state.ethPrices);
      const ltcPrices = this.filterPrices(this.state.ltcPrices);
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
