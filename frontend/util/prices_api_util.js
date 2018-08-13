export const fetchPrices = () => (
  $.ajax({
    method: 'GET',
    url: '/api/prices'
  })
);
