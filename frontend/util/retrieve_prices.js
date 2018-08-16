export const retrievePrices () => {
  let granularities = this.state.granularities;
  let coins = this.state.coins;

  let coinGranularities = []
  for (let g = 0; g < 5; g++) {
    for (let c = 0; c < 4; c++) {
      coinGranularities.push({ coin: coins[c], granularity: granularities[g] });
    }
  }

  for (let i = 0, p = Promise.resolve(); i < coinGranularities.length; i++) {
    const coin = coinGranularities[i].coin;
    const granularity = coinGranularities[i].granularity;

    p = p.then(() => new Promise(resolve => setTimeout(() => resolve(), 350))).then(() => { return this.props.getPrices(coin, granularity);});
  }
}
