case @transaction.coin_id
when 1
  json.ETH do
    json.extract! transaction, :amount, :date
  end
end

case @transaction.coin_id
when 2
  json.BCH do
    json.extract! transaction, :amount, :date
  end
end

case @transaction.coin_id
when 3
  json.LTC do
    json.extract! transaction, :amount, :date
  end
end

case @transaction.coin_id
when 4
  json.BTC do
    json.extract! transaction, :amount, :date
  end
end
