export const retrievePrices = () => (
  $.ajax({
    method: 'GET',
    url: '/api/prices'
  })
);
