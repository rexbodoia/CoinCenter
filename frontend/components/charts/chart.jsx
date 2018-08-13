import React from 'react';
import { LineChart, Line } from 'recharts';

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (Object.values(getState().entities.prices).length === 0) {
      this.props.getPrices();
    }
  }

  renderChart(data, coin) {
    if (Object.values(data).length !== 0){
      return (
        <LineChart width={1200} height={250} data={data[coin].reverse()} >
          <Line type="natural" dataKey="price" stroke="rgb(6, 103, 208)" dot={false} />
        </LineChart>
      );
    }
  }

  render () {
    let data = getState().entities.prices;
    return (
      <div className='chart-container'>
        {this.renderChart(data, 'bitcoin')}
      </div>
    );
  }
}

export default Chart;
