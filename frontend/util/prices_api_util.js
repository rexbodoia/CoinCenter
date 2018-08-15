// export const fetchPrices = () => (
//   $.ajax({
//     method: 'GET',
//     url: '/api/prices'
//   })
// );

export const fetchPriceData = (symbol, granularity) => (
  $.ajax({
    method: 'GET',
    url: `https://api.pro.coinbase.com/products/${symbol}-USD/candles?granularity=${granularity}`
  })
)
