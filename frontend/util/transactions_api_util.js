export const fetchTransactions = user_id => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${user_id}/transactions`
  })
);

export const sendTransaction = (user_id, transaction) => (
  $.ajax({
    method: 'POST',
    url: `/api/users/${user_id}/transactions`,
    data: { transaction }
  })
);
