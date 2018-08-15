// export const buyCoin = (coin, amount) => (
//   $.ajax({
//     method: 'POST',
//     url: ''
//   })
// );

export const fetchTransactions = user_id => (
  $.ajax({
    method: 'GET',
    url: `/api/transactions/${user_id}`
  })
);
