import React from 'react';

class PortfolioCustomToolTip extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.payload.length > 0){
      let value = nextProps.payload[0].value;
      let integer = Math.floor(value);
      let decimal = (value - integer).toFixed(2).toString()
      let decimalString = '.' + decimal.slice(-2);
      $('.portfolio-chart-number').find('h2').html(integer);
      $('#decimal').html(decimalString);
    }
  }

  render () {
    return (
      <div></div>
    );
  }
}

export default PortfolioCustomToolTip;
