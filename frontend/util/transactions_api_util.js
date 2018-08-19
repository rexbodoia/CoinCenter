export const fetchTransactions = user_id => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${user_id}/transactions`
  })
);

export const sendTransaction = transaction => (
  $.ajax({
    method: 'POST',
    url: `/api/users/${transaction.user_id}/transactions`,
    data: { transaction }
  })
);
