export const filterPrices = (prices, length) => {
  let result = prices.map(subArray => ({ time: subArray[0], price: subArray[3] })).slice(0, length);
  return result.filter(object => object.price && object.time);
}

export const calculateCoinValues = (coinAmounts, prices) => {
  let coinValues = [];

  if (coinAmounts.length === 0) {
    return coinValues;
  }

  let v = 0;
  let lastBalanceTime = coinAmounts[v].date;
  let nextBalanceTime = lastBalanceTime;

  for (let p = prices.length - 1; p > 0; p--) {
    let priceTime = prices[p].time;

    if (v + 1 < coinAmounts.length) {
      nextBalanceTime = coinAmounts[v + 1].date;
    }

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

  for (let i = 0; i < coinValuesArray[0].length; i++){
    let sum = coinValuesArray[0][i].value;
    let time = coinValuesArray[0][i].time;

    for(let coin = 1; coin < 4; coin++) {
      let nextTimeIdx = findNextTimeIdx(coinValuesArray[coin], time);
      sum += coinValuesArray[coin][nextTimeIdx].value;
    }
    portfolioValues.push({ time, value: sum });
  }

  return portfolioValues;
}
