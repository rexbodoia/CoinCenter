import React from 'react';

export const timeGranConverter = (arg) => {
  const map = {
    '1H': 'oneMinute',
    '1D': 'fifteenMinutes',
    '1W': 'oneHour',
    '1M': 'sixHours',
    '1Y': 'oneDay',
    'oneMinute': '1H',
    'fifteenMinutes': '1D',
    'oneHour': '1W',
    'sixHours': '1M',
    'oneDay': '1Y'
  }
  return map[arg];
}

export const findNumDataPoints = (timeframe) => {
  const timeframeLengths = {
    '1H': 60,
    '1D': 98,
    '1W': 168,
    '1M': 120,
    '1Y': 365
  }
  return timeframeLengths[timeframe];
}

const getTimeframeLength = (timeframe) => {
  const timeframeLengths = {
    '1H': 60,
    '1D': 28,
    '1W': 7,
    '1M': 31,
    '1Y': 300
  }
  return timeframeLengths[timeframe];
}

const stringifyDate = (date) => {
  let string = date.toString()
  return [string.slice(4, 7), string.slice(8, 10)];
}

const sortDates = (timeframe, className) => {
  const today = new Date();
  let stringified = stringifyDate(today);

  let length = getTimeframeLength(timeframe);
  let intervalLength = Math.ceil(length / 7);

  let dates = []

  dates.unshift(<li key={0}>{stringified[0]} {stringified[1]}</li>);

  for (let i = 1; i < 7; i++) {
    let nextDate = new Date(today.setDate(today.getDate() - intervalLength));
    let stringified = stringifyDate(nextDate);

    dates.unshift(<li key={i}>{stringified[0]} {stringified[1]}</li>);
  }

  return dates;
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

const sortTimes = (timeframe, className) => {
  let d = new Date();
  let hour = d.getHours();
  let dates = [];

  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }

  if (timeframe === '1H') {
    let minutes = new Date().getMinutes();

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    dates.unshift(<li key={0}>{hour}:{minutes}</li>)

    for(let i = 1; i < 7; i++) {
      [hour, minutes] = decrementMinutes(hour, minutes, 10);

      dates.unshift(<li key={i}>{hour}:{minutes}</li>)
    }

  } else {
    dates.unshift(<li key={0}>{hour}:00</li>)

    for (let i = 1; i < 7; i++) {
      hour = decrementHour(hour, 4);

      dates.unshift(<li key={i}>{hour}:00</li>)
    }
  }

  return dates
}

export const renderDates = (timeframe, className) => {
  if (['1W', '1M', '1Y'].includes(timeframe)) {
    return sortDates(timeframe, className);
  } else{
    return sortTimes(timeframe, className);
  }
}
