export const fetchBalances = user_id => (
  $.ajax({
    method: 'GET',
    url: `/api/balances/${user_id}`
  })
);
