namespace :seed do
  task coins: :environment do
    Coin.create(name: 'Ethereum', ticker_symbol: :ETH, current_price: 322.09)
    Coin.create(name: 'Bitcoin Cash', ticker_symbol: :BCH, current_price: 572.47)
    Coin.create(name: 'Litecoin', ticker_symbol: :LTC, current_price: 59.94)
    Coin.create(name: 'Bitcoin', ticker_symbol: :BTC, current_price: 6266.01)
  end
end
