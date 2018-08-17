export const filterPrices = (prices, length) => {
  let result = prices.map(subArray => ({ time: subArray[0], price: subArray[3] })).slice(0, length);
  return result.filter(object => object.price && object.time);
}

export const calculateCoinValues = (coinAmounts, prices) => {
  let result = [];
  let c = 0;
  let p = prices.length - 1;

  while (coinAmounts[c].date > prices[p].date) {
    if (p > 0) {
      result.push({ time: prices[p].date, value: 0 });
      prices.pop();
      p -= 1;
    } else {
      break;
    }
  }

  for (let p = prices.length - 1; p >= 0; p--){
    if (coinAmounts.length > c + 1 && prices[p].date > coinAmounts[c + 1].date) {
      coinAmounts[c] = coinAmounts[c + 1];
      c += 1;
    }
    result.push({ time: prices[p].date, value: coinAmounts[c].amount * prices[p].price });
  }

  return result;
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
  coinValuesArray = coinValuesArray.filter(subArr => subArr.length > 0);

  let portfolioValues = [];

  for (let i = 0; i < coinValuesArray[0].length; i++){
    let sum = coinValuesArray[0][i].value;
    let time = coinValuesArray[0][i].time;

    for(let coin = 1; coin < coinValuesArray.length; coin++) {
      let nextTimeIdx = findNextTimeIdx(coinValuesArray[coin], time);
      sum += coinValuesArray[coin][nextTimeIdx].value;
    }
    portfolioValues.push({ time, value: sum });
  }

  return portfolioValues;
}

export const calculateNetCoinAmounts = coinTransactions => {
  if (coinTransactions.length === 0) {
    return [{ amount: 0 }];
  }

  let totals = [{ date: coinTransactions[0].date, amount: coinTransactions[0].amount }];

  for (let i = 1; i < coinTransactions.length; i++) {
    totals.push({ date: coinTransactions[i].date, amount: totals[i - 1].amount + coinTransactions[i].amount });
  }

  return totals;
}

// let coinValues = [];
// let amount = 0;
//
// if (coinAmounts.length === 0) {
//   return coinValues;
// }
//
// let v = 0;
// let lastBalanceTime = coinAmounts[v].date;
// let nextBalanceTime = lastBalanceTime;
//
// for (let p = prices.length - 1; p >= 0; p--) {
//   let priceTime = prices[p].time;
//
//   if (v + 1 < coinAmounts.length) {
//     nextBalanceTime = coinAmounts[v + 1].date;
//   }
//
//   if (nextBalanceTime < priceTime) {
//     lastBalanceTime = nextBalanceTime;
//     v += 1;
//   }
//
//   amount += coinAmounts[v].amount;
//   coinValues.push({ time: prices[p].time, value: amount * prices[p].price});
// }
// return coinValues;
