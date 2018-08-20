## README

# CoinCenter

[Live Demo](https://coincenter.herokuapp.com/#/)

CoinCenter is a trading platform for the four most prominent crytocurrencies inspired by Coinbase's UI friendly website. This website was implemented utilizing Rails/PostgreSQL for the backend and React.js/Redux for the frontend. 

CoinCenter uses the Coinbase Pro REST API to retrieve live crypto price data upon visiting the page. Recharts, a React charting library was used as a tool for rendering charts of price and value over time for coins and user portfolios, respectively. Moment.js was also used for date conversion because the price data from Coinbase Pro used dates in Unix Epoch Time form, whereas my transactions were stored in my database using Ruby's datetime object. 

### Features
+ Coincenter utilizes custom frontend to backend user authentication using BCrypt
+ Demo login with seeded transaction history for any users who want to view only as a guest
+ Upon login, a user sees a prominently featured chart of their portfolio value over time
+ Small asset chart previews are also displayed on the dashboard, and each doubles as a link to its asset's full page
+ All charts are dynamically time-framed and feature five timeframes with corresponding price granularities
+ Users can create realtime 'dummy' transactions with any of the four coins at its live price

### Obstacles

There were several challenges I encountered while completing this project. The first of these difficulties was implementing live API calls to [Coinbase Pro](https://docs.pro.coinbase.com/#api). This was difficult for two reasons:

The first obstacle was straightforward, but caused some design complications that persisted throughout the website. Like many other REST APIs, Coinbase Pro limits the number of API calls allowed to three per second. This meant that I needed to chain promises with setTimeout() functions of 350 milliseconds into chains that contained usually four API calls. Furthermore, if I did happen to receive a status 429 for exceeding my limit of requests, I needed to handle that error, wait a timeout interval, and then try again:

```Javascript
//  frontend/actions/prices_actions.js

  export const fetchPrices = (symbol, granularity) => dispatch => (
    ApiUtil.fetchPriceData(symbol, granularities[granularity])
    .then(prices => dispatch(receivePrices(symbol, granularities[granularity], prices)))
    .fail((e) => setTimeout(fetchPrices(symbol, granularity), 2000))
  );
  ```

This became a recursive error handling call and would continue to call until no error was received. This obstacle also created a slight design dilemma. Because Coinbase only deals with four coins and there are only five timeframes (granularities) to request, there were only twenty API calls I would ever need to make. Unfortunately I had to spread these calls out somehow, so I decided to make the calls for the default timeframe of the dashboard upon login. When viewing the portfolio chart history, all four coin prices would need to be requested for any given timeframe, so I made these calls together if the information was not already stored in the global state:

```Javascript
//  frontend/components/signed_in/dashboard/portfolio_chart.jsx

if (Object.values(this.props.prices[granularity]).length < 4) {
  this.props.getPrices('BTC', granularity)
    .then(() => setTimeout(() => this.props.getPrices('BCH', granularity)
    .then(() => setTimeout(() => this.props.getPrices('ETH', granularity)
    .then(() => setTimeout(() => this.props.getPrices('LTC', granularity), 334)), 334)), 334));
```

The second challenge I faced had to do with the fact that I calculated the portfolio and balance values history from transactions and current price history only. I originally considered storing balances at certain dates for all users in a table in my database, however there is no good way to choose what dates would be appropriate for that table except for choosing the dates of the user's past transactions. This would just end up being a waste of space because I already have the dates of past transactions, so I could just calculate net balance amounts from those dates and calculate values for different time granularities dynamically from a given set of price history data. Ultimately, that is exactly what I did, and it proved to be difficult because of how the data was formatted in Coinbase Pro's API json as well as the process of having to extract the price of each coin at every price date and multiply it by that coin's balance amount and then sum those values between the four coins at every price date. This was especially tricky because transactions could occur at any date and are often sparse, whereas each timeframe granularity corresponds to another, unrelated set of interval times. Ultimately, I created a calculations.js file to handle these data manipulations and value calculation functions:

```Javascript
//  frontend/util/calculations.js

import moment from 'moment';

export const calculateCoinValues = (coinAmounts, prices) => {
  let values = [];

  for (let i = prices.length - 1; i >= 0; i--) {
      values.push(prices[i].price * coinAmounts[i].amount);
  }

  return values;
}

export const filterPrices = (prices, length) => {
  const result = prices.map(subArray => ({ time: subArray[0], price: subArray[3] })).slice(0, length);
  return result.filter(object => object.price && object.time);
}

export const calculateNetCoinAmounts = coinTransactions => {
  if (coinTransactions.length === 0) {
    return [{ amount: 0 }];
  }

  const totals = [{ time: coinTransactions[0].date, amount: coinTransactions[0].amount }];

  for (let i = 1; i < coinTransactions.length; i++) {
    totals.push({ time: coinTransactions[i].date, amount: totals[i - 1].amount + coinTransactions[i].amount });
  }
  return totals;
}

export const amountsAtPriceDates = (coinAmounts, prices) => {
  let oldestPriceDate = prices[prices.length - 1].time;
  let lastAmountDateIdx = 0

  for (let i = 1; i < coinAmounts.length; i++) {
    if (moment(coinAmounts[i].time) < moment.unix(oldestPriceDate)) {
      lastAmountDateIdx = i;
    }
  }

  let result = [];
  let c = lastAmountDateIdx;
  let lastCoinAmount = coinAmounts[c].amount;

  for (let p = prices.length - 1; p >= 0; p--) {
    if (moment.unix(prices[p].time) > moment(coinAmounts[c].time) && coinAmounts.length > c + 1) {
      lastCoinAmount = coinAmounts[c].amount;
      c += 1;
    }
    result.push({ time: prices[p].time, amount: lastCoinAmount });
  }

  return result;
}

export const findNextTimeIdx = (array, currentTime) => {
  const lastTime = [array[0].time, 0];

  for(let idx = 1; idx < array.length; idx++) {
    if (array[idx].time > currentTime) {
      return lastTime[1];
    } else {
      lastTime[0] = array[idx].time;
      lastTime[1] += 1;
    }
  }
  return lastTime[1];
}

export const compileBalanceValues = coinValuesArray => {
  coinValuesArray = coinValuesArray.filter(subArr => subArr.length > 0);

  const portfolioValues = [];

  for (let i = 0; i < coinValuesArray[0].length; i++){
    let sum = 0;

    for(let coin = 0; coin < coinValuesArray.length; coin++) {
      sum += coinValuesArray[coin][i];
    }
    portfolioValues.push({ time: i, value: sum });
  }
  return portfolioValues;
}

export const findChartDifferences = (data) => {
  let first = data[0].price;
  let last = data[data.length - 1].price;
  let diff = (first - last) / last;

  return [first - last, (diff * 100).toFixed(2)]
}

export const calculationHelper = (propsPrices, propsAmounts, granularity, length) => {
  const coins = ['BCH', 'BTC', 'ETH', 'LTC'];
  let values = [];
  for (let i = 0; i < coins.length; i++) {
    let prices = filterPrices(propsPrices[granularity][coins[i]], length);
    let oldDateAmounts = calculateNetCoinAmounts(propsAmounts[coins[i]]);
    let newDateAmounts = amountsAtPriceDates(oldDateAmounts, prices);
    values.push(calculateCoinValues(newDateAmounts, prices));
  }

  return values;
}
``` 
