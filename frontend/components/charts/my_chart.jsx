import React from 'react';
import Chart from 'chart.js';
import { LineChart, Line } from 'recharts';

class MyChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPrices();
  }

  render () {
    console.log(getState().entities.prices);
    return (
      <div>

      </div>
    );
  }
}

export default MyChart;
