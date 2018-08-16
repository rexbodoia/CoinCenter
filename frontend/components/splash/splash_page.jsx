import React from 'react';
import { withRouter } from 'react-router-dom';
import SignupHeader from '../session/signup_header';
import AuthFormsContainer from '../session/auth_forms_container';
import { throttle } from 'lodash';

class SplashPage extends React.Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.update = this.update.bind(this);
    this.retrievePrices = this.retrievePrices.bind(this);
    this.state = {
      open: false,
      email: '',
      coins: ['BTC', 'BCH' ,'ETH', 'LTC'],
      granularities: ['fifteenMinutes', 'sixHours', 'oneHour', 'oneMinute', 'oneDay']
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = 'white';
    if(Object.values(this.props.prices).length === 0){
      this.retrievePrices();
    }
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  retrievePrices() {
    let granularities = this.state.granularities;
    let coins = this.state.coins;

    // let counter = 0;
    // let getPricesWrapper = (coin, granularity) => {
    //   this.props.getPrices(coin, granularity).then(() =>{
    //     counter += 1;
    //   })
    // }
    //
    // let throttledGetPrices = throttle(getPricesWrapper, 1000, { 'leading': true });

    let coinGranularities = []
    for (let g = 0; g < 5; g++) {
      for (let c = 0; c < 4; c++) {
        coinGranularities.push({ coin: coins[c], granularity: granularities[g] });
      }
    }

    for (let i = 0, p = Promise.resolve(); i < coinGranularities.length; i++) {
      const coin = coinGranularities[i].coin;
      const granularity = coinGranularities[i].granularity;
      
      p = p.then(() => new Promise(resolve => setTimeout(() => resolve(), 350))).then(() => { return this.props.getPrices(coin, granularity);});
    }
  }

    // for (let i = 0; i < coinGranularities.length; i++) {
    //   while(i == counter) {
    //     throttledGetPrices(coinGranularities[i].coin, coinGranularities[i].granularity);
    //   }
    // }
  // this.props.getPrices(coins[coin], granularities[granularity])
  //   .then(setTimeout(() => {
  //
  //   }, ))

  // const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
  //
  // (async function granularities() {
  //   for (let g = 0; g < 2; g++) {
  //     await delay(350);
  //     (async function coins() {
  //       for (let c = 0; c < 1; c++) {
  //         await delay(350);
  //         this.props.getPrices(coins[c], granularities[g]);
  //       }
  //     })();
  //   }
  // })();

  // setTimeout(() => this.props.getPrices(coin, granularity), (coin + 1) * (granularity + 1) * 1500);

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
            <AuthFormsContainer email={this.state.email} />
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

export default withRouter(SplashPage);
