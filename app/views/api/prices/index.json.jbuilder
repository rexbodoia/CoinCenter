json.ethereum do
  json.array! @eth_prices.each do |eth|
    json.extract! eth, :id, :date, :coin_id, :price
  end
end

json.bitcoinCash do
  json.array! @bch_prices.each do |bch|
    json.extract! bch, :id, :date, :coin_id, :price
  end
end

json.litecoin do
  json.array! @ltc_prices.each do |ltc|
    json.extract! ltc, :id, :date, :coin_id, :price
  end
end

json.bitcoin do
  json.array! @btc_prices.each do |btc|
    json.extract! btc, :id, :date, :coin_id, :price
  end
end
