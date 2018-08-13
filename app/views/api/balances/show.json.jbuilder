@balances.each do |balance|
  case balance.coin_id
  when 1
    json.ethereum do
      json.extract! balance, :amount
    end
  when 2
    json.bitcoinCash do
      json.extract! balance, :amount
    end
  when 3
    json.litecoin do
      json.extract! balance, :amount
    end
  when 4
    json.bitcoin do
      json.extract! balance, :amount
    end
  end
end
