import React from 'react';

class Portfolio extends React.Component {
  constructor(props) {
      super(props);
  }

  render () {
    return (
      <div className='portfolio-container'>
        <div className='portfolio-header'>
          <div className='portfolio-left'><h1>Your Portfolio</h1></div>
          <div className='portfolio-tabs'>
            <div><span>List</span></div>
            <div className='portfolio-empty-div'></div>
            <div><span>Chart</span></div>
            <div className='portfolio-empty-div' style={{ paddingRight: 8 }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
