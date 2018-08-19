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
