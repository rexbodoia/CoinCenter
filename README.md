## README

# Coincenter

[Live Demo](https://coincenter.herokuapp.com/#/)

Coincenter is a trading platform for the four most prominent crytocurrencies inspired by Coinbase's UI friendly website. This website was implemented utilizing Rails/PostgreSQL for the backend and React.js/Redux for the frontend. 

Coincenter uses the Coinbase Pro REST API to retrieve live crypto price data upon visiting the page. Recharts, a React charting library was used as a tool for rendering charts of price and value over time for coins and user portfolios, respectively.

### Features
+ Coincenter utilizes custom frontend to backend user authentication using BCrypt
+ Demo login with seeded transaction history for any users who want to view only as a guest
+ Upon login, a user sees a prominently featured chart of their portfolio value over time
+ Small asset chart previews are also displayed on the dashboard, and each doubles as a link to its asset's full page
+ All charts are dynamically time-framed and feature five timeframes with corresponding price granularities
+ Users can create realtime 'dummy' transactions with any of the four coins at its live price
