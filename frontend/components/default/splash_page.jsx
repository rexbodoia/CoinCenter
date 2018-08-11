import React from 'react';
import { withRouter } from 'react-router-dom';
import SignupHeader from '../session/signup_header';
import AuthFormsContainer from '../session/auth_forms_container';

class SplashPage extends React.Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundColor = 'white';
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  openModal(e) {
    e.preventDefault();
    [].slice.call(document.getElementsByClassName('modal'))[0].classList.add('is-open');
  }

  closeModal(e) {
    e.preventDefault();
    [].slice.call(document.getElementsByClassName('modal'))[0].classList.remove('is-open');
  }


  render () {
    return (
      <div className='splash-container'>
        <SignupHeader history={this.props.history} location={this.props.location}/>

        <div className='splash-content'>
          <h1 className='splash-heading'>Buy and sell digital currency</h1>
          <p className='splash-text'>Coincenter is the easiest and most trusted place to buy, sell, and manage your digital currency</p>
        </div>

        <form onSubmit={this.openModal} className='splash-form'>
          <div className='splash-email-container'>
            <input placeholder='Email address' className='splash-email'></input>
          </div>

          <input type='submit' className='splash-button' value='Get Started'></input>
        </form>

        <div className='modal'>
          <section className='modal-screen'></section>
          <section className='modal-form'>
            <span className='modal-close' onClick={this.closeModal}>&times;</span>
            <h1>Create account</h1>
            <AuthFormsContainer />
          </section>

        </div>
      </div>
    );
  }
}

export default SplashPage;
