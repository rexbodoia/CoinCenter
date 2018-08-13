@eth = []
@bch = []
@ltc = []
@btc = []
@balances.each do |balance|
  case balance.coin_id
  when 1
    @eth.push(balance)
  when 2
    @bch.push(balance)
  when 3
    @ltc.push(balance)
  when 4
    @btc.push(balance)
  end
end

json.ethereum do
  json.array! @eth.each do |balance|
    json.extract! balance, :amount, :date
  end
end

json.bitcoinCash do
  json.array! @bch.each do |balance|
    json.extract! balance, :amount, :date
  end
end

json.litecoin do
  json.array! @ltc.each do |balance|
    json.extract! balance, :amount, :date
  end
end

json.bitcoin do
  json.array! @btc.each do |balance|
    json.extract! balance, :amount, :date
  end
end
