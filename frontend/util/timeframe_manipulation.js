export const timeGranConverter = (arg) => {
  // if (arg === 'all') {
  //   return this.longestBalance(this.state.balances);
  // }

  const map = {
    'hour': 'oneMinute',
    'day': 'fifteenMinutes',
    'week': 'oneHour',
    'month': 'sixHours',
    'year': 'oneDay',
    'oneMinute': 'hour',
    'fifteenMinutes': 'day',
    'oneHour': 'week',
    'sixHours': 'month',
    'oneDay': 'year'
  }
  return map[arg];
}

export const getTimeframeLength = (timeframe) => {
  if (timeframe === 'all') {
    return this.longestBalance(this.state.balances);
  }

  const timeframeLengths = {
    'hour': 60,
    'day': 96,
    'week': 168,
    'month': 120,
    'year': 365
  }
  return timeframeLengths[timeframe];
}

export const stringifyDate = (date) => {
  let string = date.toString()
  return [string.slice(4, 7), string.slice(8, 10)];
}

export const renderDates = (timeframe) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const today = new Date();
  let stringified = this.stringifyDate(today);

  let length = getTimeframeLength(timeframe);
  let intervalLength = Math.ceil(length / 7);

  $('.portfolio-chart-dates').find('ul').empty();
  $('.portfolio-chart-dates').find('ul').prepend(`<li>${stringified[0]} ${stringified[1]}</li>`);

  for (let i = 0; i < 6; i++) {
    let nextDate = new Date(today.setDate(today.getDate() - intervalLength));
    let stringified = this.stringifyDate(nextDate);

    $('.portfolio-chart-dates').find('ul').prepend(`<li>${stringified[0]} ${stringified[1]}</li>`);
  }
}

export const changeTimeframe = (timeframe) => {
  this.setState({ timeframe });
  let granularity = TimeframeToGranularity(timeframe);
  let amounts = calculateBalanceAmounts(this.props.transactions);
  console.log(amounts);
  let values = calculateBalanceValues(amounts, this.props.prices);
  this.totalData = values;
}
