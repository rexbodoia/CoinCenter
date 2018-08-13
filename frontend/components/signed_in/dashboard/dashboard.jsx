import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getBalances(getState().session.id);
  }

  render(){
    console.log(getState().entities);
    return (
      <div></div>
    );
  }
}

export default Dashboard;
