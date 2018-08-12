# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

1000.times do |num|
  User.create(f_name: 'guest', l_name: 'user', email: "guest#{num}@user.com", password: '12345678')
end

Coin.create(name: 'Ethereum', ticker_symbol: :ETH, current_price: 322.09)
Coin.create(name: 'Bitcoin Cash', ticker_symbol: :BCH, current_price: 572.47)
Coin.create(name: 'Litecoin', ticker_symbol: :LTC, current_price: 59.94)
Coin.create(name: 'Bitcoin', ticker_symbol: :BTC, current_price: 6266.01)
