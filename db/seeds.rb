# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Coin.create(name: 'Ethereum', ticker_symbol: :ETH, current_price: 322.09)
Coin.create(name: 'Bitcoin Cash', ticker_symbol: :BCH, current_price: 572.47)
Coin.create(name: 'Litecoin', ticker_symbol: :LTC, current_price: 59.94)
Coin.create(name: 'Bitcoin', ticker_symbol: :BTC, current_price: 6266.01)

rand_gen = Random.new;

100.times do |user_num|
  User.create(f_name: 'guest', l_name: 'user', email: "guest#{user_num}@user.com", password: '12345678')
  4.times do |coin_num|
    Balance.create!(user_id: user_num + 1, coin_id: coin_num + 1, amount: rand_gen.rand(2000.0).round(2))
  end
end
