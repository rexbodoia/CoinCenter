import React from 'react';
import { withRouter } from 'react-router-dom';
import SignupHeader from '../session/signup_header';

class SplashPage extends React.Component {
  constructor(props) {
    super(props);

    this.signupRedirect = this.signupRedirect.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundColor = 'white';
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  signupRedirect(e) {
    e.preventDefault();
    this.props.history.push('/signup');
  }

  render () {
    return (
      <div className='splash-container'>
        <SignupHeader history={this.props.history} location={this.props.location}/>

        <div className='splash-content'>
          <h1 className='splash-heading'>Buy and sell digital currency</h1>
          <p className='splash-text'>Coincenter is the easiest and most trusted place to buy, sell, and manage your digital currency</p>
        </div>

        <form onSubmit={this.signupRedirect} className='splash-form'>
          <div className='splash-email-container'>
            <input placeholder='Email address' className='splash-email'></input>
          </div>

          <input type='submit' className='splash-button js-modal-open' value='Get Started'></input>
        </form>
      </div>
    );
  }
}

export default SplashPage;
