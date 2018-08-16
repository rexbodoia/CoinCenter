export const timeGranConverter = (arg) => {
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

export const findNumDataPoints = (timeframe) => {
  if (timeframe === 'all') {
    return this.longestBalance(this.state.balances);
  }

  const timeframeLengths = {
    'hour': 60,
    'day': 98,
    'week': 168,
    'month': 120,
    'year': 365
  }
  return timeframeLengths[timeframe];
}

const getTimeframeLength = (timeframe) => {
  if (timeframe === 'all') {
    return this.longestBalance(this.state.balances);
  }

  const timeframeLengths = {
    'hour': 60,
    'day': 28,
    'week': 7,
    'month': 31,
    'year': 12
  }
  return timeframeLengths[timeframe];
}

const stringifyDate = (date) => {
  let string = date.toString()
  return [string.slice(4, 7), string.slice(8, 10)];
}

const sortDates = (timeframe) => {
  const today = new Date();
  let stringified = stringifyDate(today);

  let length = getTimeframeLength(timeframe);
  let intervalLength = Math.ceil(length / 7);

  $('.portfolio-chart-dates').find('ul').prepend(`<li>${stringified[0]} ${stringified[1]}</li>`);

  for (let i = 0; i < 6; i++) {
    let nextDate = new Date(today.setDate(today.getDate() - intervalLength));
    let stringified = stringifyDate(nextDate);

    $('.portfolio-chart-dates').find('ul').prepend(`<li>${stringified[0]} ${stringified[1]}</li>`);
  }
}

const decrementHour = (hour, amount) => {
  hour -= amount;

  if (hour > 12) {
    hour -= 12;
  } else if (hour < 0) {
    hour += 12;
  } else if (hour === 0) {
    hour = 12;
  }

  return hour;
}

const decrementMinutes = (hour, minutes, amount) => {
  minutes -= amount;

  if (minutes < 0) {
    minutes += 60;
    hour = decrementHour(hour, 1);
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  return [hour, minutes];
}

const sortTimes = (timeframe) => {
  let d = new Date();
  let hour = d.getHours();

  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }

  if (timeframe === 'hour') {
    let minutes = new Date().getMinutes();

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    $('.portfolio-chart-dates').find('ul').prepend(`<li>${hour}:${minutes}</li>`);
    for(let i = 0; i < 6; i++) {
      [hour, minutes] = decrementMinutes(hour, minutes, 10);

      $('.portfolio-chart-dates').find('ul').prepend(`<li>${hour}:${minutes}</li>`);
    }

  } else {
    $('.portfolio-chart-dates').find('ul').prepend(`<li>${hour}:00</li>`);
    for (let i = 0; i < 6; i++) {
      hour = decrementHour(hour, 4);

      $('.portfolio-chart-dates').find('ul').prepend(`<li>${hour}:00</li>`);
    }
  }
}

export const renderDates = (timeframe) => {
  $('.portfolio-chart-dates').find('ul').empty();

  if (['week', 'month', 'year'].includes(timeframe)) {
    sortDates(timeframe);
  } else{
    sortTimes(timeframe);
  }
}
