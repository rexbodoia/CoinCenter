import React from 'react';
import { LineChart, Line } from 'recharts';

class MyChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (Object.values(getState().entities.prices).length === 0) {
      this.props.getPrices();
    }
  }

  renderChart(data) {
    if (Object.values(data).length !== 0){
      return (
        <LineChart width={1000} height={200} data={data.bitcoin}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
        </LineChart>
      );
    }
  }

  render () {
    let data = getState().entities.prices
    return (
      <div>
        {this.renderChart(data)}
      </div>
    );
  }
}

export default MyChart;
