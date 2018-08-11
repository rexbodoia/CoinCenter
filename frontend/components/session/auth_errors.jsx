import React from 'react';

class AuthErrors extends React.Component {
  constructor(props) {
    super(props);
    this.clearErrors = this.props.clearErrors.bind(this);
  }

  componentDidMount() {
    if (this.props.pathname === '/') {
      document.getElementsByClassName('errors').item(0).classList.add('modal-errors');
    }
  }

  componentWillUnmount() {
    if (this.props.pathname === '/') {
      document.getElementsByClassName('errors').item(0).classList.remove('modal-errors');
    }
  }

  render () {
    return (
      <ul className='errors'>
        {this.props.errors.map((error, idx) => {
          if(error === "F name can't be blank"){
            error = "First name can't be blank";
          } else if (error === "L name can't be blank") {
            error = "Last name can't be blank";
          } else if (error === "Password is too short (minimum is 8 characters)") {
            error = "Password is too short";
          }
          if (idx === 0) {
            return <li key={idx}>{error}<span className='x-button' onClick={this.clearErrors}>x</span></li>
          } else {
            return <li key={idx}>{error}</li>
          }
        })}
      </ul>
    );
  }
}

export default AuthErrors;
