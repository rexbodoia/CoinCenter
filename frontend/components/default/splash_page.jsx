import React from 'react';
import { withRouter } from 'react-router-dom';
import SignupHeader from '../session/signup_header';
import AuthFormsContainer from '../session/auth_forms_container';

class SplashPage extends React.Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      open: false,
      email: ''
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = 'white';
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  openModal(e) {
    e.preventDefault();
    this.setState({open: true});
  }

  closeModal(e) {
    e.preventDefault();
    this.setState({open: false});
  }

  update(e) {
    this.setState({email: e.target.value});
  }

  renderModal() {
    if (this.state.open) {
      return (
        <div className='modal'>
          <section className='modal-screen'></section>
          <section className='modal-form'>
            <span className='modal-close' onClick={this.closeModal}>&times;</span>
            <h1>Create account</h1>
            <AuthFormsContainer email={this.state.email}/>
          </section>
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        <div className='splash-container'>
          <SignupHeader history={this.props.history} location={this.props.location}/>

          <div className='splash-content'>
            <h1 className='splash-heading'>Buy and sell digital currency</h1>
            <p className='splash-text'>Coincenter is the easiest and most trusted place to buy, sell, and manage your digital currency</p>
          </div>

          <form onSubmit={this.openModal} className='splash-form'>
            <div className='splash-email-container'>
              <input type='email' placeholder='Email address' className='splash-email' onChange={this.update}></input>
            </div>

            <input type='submit' className='splash-button' value='Get Started'></input>
          </form>

          {this.renderModal()}
        </div>
        <div className='lower-splash'>
          <h1>Create your digital currency portfolio today</h1>
          <p>Coincenter has a variety of features that make it the best place to start trading</p>
        </div>
      </div>
    );
  }
}

export default SplashPage;
