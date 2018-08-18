export const filterPrices = (prices, length) => {
  const result = prices.map(subArray => ({ time: subArray[0], price: subArray[3] })).slice(0, length);
  return result.filter(object => object.price && object.time);
}

export const calculateCoinValues = (coinAmounts, prices) => {
  const result = [];
  let c = 0;
  let p = prices.length - 1;
  let amount = coinAmounts[c];

  while (coinAmounts[c].date > prices[p].time) {
    if (p > 0) {
      result.push({ time: prices[p].time, value: 0 });
      prices.pop();
      p -= 1;
    } else {
      break;
    }
  }

  for (let p = prices.length - 1; p >= 0; p--){
    if (coinAmounts.length > c + 1 && prices[p].time > coinAmounts[c + 1].date) {
      amount = coinAmounts[c + 1];
      c += 1;
    }
    result.push({ time: prices[p].time, value: amount.amount * prices[p].price });
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
    let sum = coinValuesArray[0][i].value;
    const time = coinValuesArray[0][i].time;

    for(let coin = 1; coin < coinValuesArray.length; coin++) {
      const nextTimeIdx = findNextTimeIdx(coinValuesArray[coin], time);
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

  const totals = [{ time: coinTransactions[0].date, amount: coinTransactions[0].amount }];

  for (let i = 1; i < coinTransactions.length; i++) {
    totals.push({ time: coinTransactions[i].date, amount: totals[i - 1].amount + coinTransactions[i].amount });
  }

  return totals;
}

export const findChartDifferences = (data) => {
  let first = data[0].price;
  let last = data[data.length - 1].price;
  let diff = (first - last) / last;

  return [first - last, (diff * 100).toFixed(2)]
}

//
// const transactions = [{ date: new Date(2016, 2, 3), amount: 2.5 }, { date: new Date(2016, 8, 5), amount: -1 }, { date: new Date(2016, 10, 17), amount: 2 }];
//
// const prices = [
//   { date: new Date(2016, 1, 1), price: 5000 },
//   { date: new Date(2016, 3, 1), price: 4000 },
//   { date: new Date(2016, 5, 1), price: 6000 },
//   { date: new Date(2016, 7, 1), price: 6000 },
//   { date: new Date(2016, 9, 1), price: 8000 },
//   { date: new Date(2016, 11, 1), price: 5000 }
// ]
//
// let amountsEndResult = calculateNetCoinAmounts(transactions);
// let valuesEndResult = calculateCoinValues(amountsEndResult, prices);

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
