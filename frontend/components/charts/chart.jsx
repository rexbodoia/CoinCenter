import React from 'react';

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPrices();
  }

  render () {
    return (
      <div>
        <h1>Hey</h1>
      </div>
    );
  }
}

export default Chart;
