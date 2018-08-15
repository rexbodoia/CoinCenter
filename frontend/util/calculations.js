export const filterPrices = (prices) => {
  return prices.map(subArray => ({ time: subArray[0], price: subArray[3] })).slice(24).reverse();
}

// export const calculateBalanceAmounts = transactions => {
//   let eth = 0.0;
//   let bch = 0.0;
//   let ltc = 0.0;
//   let btc = 0.0;
//
//   let balances = [];
//
//   for (let i = 0; i < transactions.length; i++) {
//     switch (transactions[i].coin_id) {
//       case 1:
//         eth += transactions[i].amount;
//       case 2:
//         bch += transactions[i].amount;
//       case 3:
//         ltc += transactions[i].amount;
//       case 4:
//         btc += transactions[i].amount;
//       default:
//         balances.push({ time: transactions[i].date, amounts: [eth, bch, ltc, btc] });
//     }
//   }
//
//   return balances;
// }

// export const calculateBalanceValues = (balances, prices) => {
//   let balanceValues = [];
//
//   if (balances.length === 0) {
//     return balanceValues;
//   }
//
//   let b = 0;
//   let lastBalanceTime = balances[b].time;
//
//   for (let p = 0; p < prices.length; p++) {
//     let priceTime = prices[p].time;
//     let nextBalanceTime = balances[b + 1].time;
//
//     if (nextBalanceTime < priceTime) {
//       lastBalanceTime = nextBalanceTime;
//       b += 1;
//     }
//
//     let amounts = balances[b].amounts
//     for (let i = 0; i < 4; i++) {
//       balanceValues.push({ time: prices[p].time, amount: amounts[i] * prices[p].price });
//     }
//   }
//
//   return balanceValues;
// }

export const calculateCoinValues = (coinAmounts, prices) => {
  let coinValues = [];

  if (coinAmounts.length === 0) {
    return coinValues;
  }

  let v = 0;
  let lastBalanceTime = coinAmounts[v].date;

  for (let p = prices.length - 1; p > 0; p--) {
    let priceTime = prices[p].time;
    let nextBalanceTime = coinAmounts[v + 1].date;

    if (nextBalanceTime < priceTime) {
      lastBalanceTime = nextBalanceTime;
      v += 1;
    }

    let amount = coinAmounts[v].amount;
    coinValues.push({ time: prices[p].time, value: amount * prices[p].price});
  }
  return coinValues;
}

export const findNextTimeIdx = (array, currentTime) => {
  let lastTime = [array[0].time, 0];

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
  let portfolioValues = [];

  console.log('coin values array');
  console.log(coinValuesArray);

  for (let i = 0; i < coinValuesArray[0].length; i++){
    let sum = coinValuesArray[0][i].value;
    let time = coinValuesArray[0][i].time;

    for(let coin = 1; coin < 4; coin++) {
      let nextTimeIdx = findNextTimeIdx(coinValuesArray[coin], time);
      sum += coinValuesArray[coin][nextTimeIdx].value;
    }
    portfolioValues.push({ time, value: sum });
  }

  console.log('portfolio value data');
  console.log(portfolioValues);

  return portfolioValues;
}
// for (let coin = 0; coin < coinValuesArray.length; coin++) {
//   let sum = 0;
//   let coinValues = coinValuesArray[coin];
//
//   for (let i = 0; i < coinValues.length; i++) {
//
//   }
// }
// coinValuesArray

export const TimeframeToGranularity = (timeframe) => {
  if (timeframe === 'all') {
    return this.longestBalance(this.state.balances);
  }

  const timeframeGranularities = {
    'hour': 'oneMinute',
    'day': 'fifteenMinutes',
    'week': 'oneHour',
    'month': 'sixHours',
    'year': 'oneDay'
  }
  return timeframeGranularities[timeframe];
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
