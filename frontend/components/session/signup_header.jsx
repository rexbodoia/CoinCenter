import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div>
        <h1 className='logo'>coincenter</h1>
      </div>
    );
  }
}

export default withRouter(SignupHeader);
