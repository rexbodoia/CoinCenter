## README

# CoinCenter

[Live Demo](https://coincenter.herokuapp.com/#/)

CoinCenter is a trading platform for the four most prominent crytocurrencies inspired by Coinbase's UI friendly website. This website was implemented utilizing Rails/PostgreSQL for the backend and React.js/Redux for the frontend. 

CoinCenter uses the Coinbase Pro REST API to retrieve live crypto price data upon visiting the page. Recharts, a React charting library was used as a tool for rendering charts of price and value over time for coins and user portfolios, respectively.

### Features
+ Coincenter utilizes custom frontend to backend user authentication using BCrypt
+ Demo login with seeded transaction history for any users who want to view only as a guest
+ Upon login, a user sees a prominently featured chart of their portfolio value over time
+ Small asset chart previews are also displayed on the dashboard, and each doubles as a link to its asset's full page
+ All charts are dynamically time-framed and feature five timeframes with corresponding price granularities
+ Users can create realtime 'dummy' transactions with any of the four coins at its live price

### Obstacles

There were several difficult aspects involved with completing this project. The first of these challenges was implementing live API calls to [Coinbase Pro](https://docs.pro.coinbase.com/#api). This was difficult for two reasons:

The first obstacle was straightforward, but caused some design complications that persisted throughout the website. Like many other REST APIs, Coinbase Pro limits the number of API calls allowed to three per second. This meant that I needed to chain promises with setTimeout() functions of 350 milliseconds that contained my API calls. Furthermore, if I did happen to receive a status 429 for exceed my limit of requests, I needed to handle that error, wait a timeout interval, and then try again:

```Javascript
  export const fetchPrices = (symbol, granularity) => dispatch => (
    ApiUtil.fetchPriceData(symbol, granularities[granularity])
    .then(prices => dispatch(receivePrices(symbol, granularities[granularity], prices)))
    .fail((e) => setTimeout(fetchPrices(symbol, granularity), 2000))
  );
  ```

  This became a recursive error handling call and would continue to call until no error was received. This obstacle also created a slight design dilemma. Because Coinbase only deals with four coins and there are only five timeframes (granularities) to request, there were only twenty API calls I would ever need to make. I had to spread these calls out somehow though, so I decided to make the calls for the default timeframe upon login. When viewing the portfolio chart history, all four coin prices would need to be requested for any given timeframe, so I made these calls together if the information was not already stored in the global state:

  ```Javascript
  if (Object.values(this.props.prices[granularity]).length < 4) {
    this.props.getPrices('BTC', granularity)
      .then(() => setTimeout(() => this.props.getPrices('BCH', granularity)
      .then(() => setTimeout(() => this.props.getPrices('ETH', granularity)
      .then(() => setTimeout(() => this.props.getPrices('LTC', granularity), 334)), 334)), 334));
  ```
