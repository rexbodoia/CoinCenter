import React from 'react';
import Chart from 'chart.js';

class MyChart extends React.Component {
  constructor(props) {
    super(props);
    this.props.getPrices();
  }

  componentDidMount() {
    const ctx = document.getElementById("myChart");
    console.log(getState());
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          data: this.props.prices
        }]
      }
    });
  }

  render () {
    return (
      <div>
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    );
  }
}

export default MyChart;
