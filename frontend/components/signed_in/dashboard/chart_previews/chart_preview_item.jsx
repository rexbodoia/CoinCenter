import React from 'react';
import { AreaChart, Area, YAxis } from 'recharts';

class ChartPreviewItem extends React.Component {
  constructor(props){
    super(props);

    this.coin = this.props.coin;
    this.colors = {
      'Bitcoin': "rgb(247, 170, 4)",
      'Bitcoin Cash': "rgb(134, 175, 58)",
      'Ethereum': "rgb(86, 116, 226)",
      'Litecoin': "rgb(191, 189, 189)"
    }
  }

  render() {
    const data = this.props.prices.slice(0, 30).reverse();
    return (
      <div className='chart-preview-container'>
        <div className='chart-preview-header'>
          <div className='chart-preview-title'>
            <h1>{this.coin}</h1>
          </div>
          <div className='chart-preview-number'>
            <h1>$</h1>
          </div>
        </div>

        <AreaChart width={294} height={120} data={data}>

          <Area type="monotone" dataKey="price" fill="white" fillOpacity={1} stroke={this.colors[this.coin]} strokeWidth={1.6}/>
          <YAxis hide={true} domain={[dataMin => dataMin / 2, dataMax => (dataMax * 2)]} />
        </AreaChart>
      </div>
    );
  }
}

export default ChartPreviewItem;
