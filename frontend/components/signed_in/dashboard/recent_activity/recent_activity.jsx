import React from 'react';

class RecentActivity extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='recent-activity-container'>
        <div className='recent-activity-header'>
          <h1>Recent Activity</h1>
        </div>
      </div>
    );
  }
}

export default RecentActivity;
