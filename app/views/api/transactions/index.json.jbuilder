@eth = []
@bch = []
@ltc = []
@btc = []
@transactions.each do |transaction|
  case transaction.coin_id
  when 1
    @eth.push(transaction)
  when 2
    @bch.push(transaction)
  when 3
    @ltc.push(transaction)
  when 4
    @btc.push(transaction)
  end
end

json.ETH do
  json.array! @eth.each do |transaction|
    json.extract! transaction, :amount, :date
  end
end

json.BCH do
  json.array! @bch.each do |transaction|
    json.extract! transaction, :amount, :date
  end
end

json.LTC do
  json.array! @ltc.each do |transaction|
    json.extract! transaction, :amount, :date
  end
end

json.BTC do
  json.array! @btc.each do |transaction|
    json.extract! transaction, :amount, :date
  end
end
