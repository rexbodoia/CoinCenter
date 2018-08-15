# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Coin.create(name: 'Ethereum', ticker_symbol: :ETH)
Coin.create(name: 'Bitcoin Cash', ticker_symbol: :BCH)
Coin.create(name: 'Litecoin', ticker_symbol: :LTC)
Coin.create(name: 'Bitcoin', ticker_symbol: :BTC)

times_gen = Random.new;
amount_gen = Random.new;
date_gen = Random.new

10.times do |user_num|
  User.create(f_name: 'guest', l_name: 'user', email: "guest#{user_num}@user.com", password: '12345678')
end

times_gen.rand(100).times do |time|
  Transaction.create(date: Date.new - date_gen.rand(600), coin_id: times_gen.rand(4) + 1), user_id: times_gen.rand(10), amount: amount_gen.rand(5000)) 
end

  # date = Date.new(2018,8,11);
  # bitcoin = rand_gen.rand(1.0)
  # ethereum = rand_gen.rand(2.0)
  # litecoin = rand_gen.rand(20.0)
  # bitcoin_cash = rand_gen.rand(8.0)
  #
  # 365.times do |date_num|
  #   d = date - date_num
  #   amount = Price.where(date: d).pluck(:price)
  #   total = ethereum * amount[0] + bitcoin_cash * amount[1] + litecoin * amount[2] + bitcoin * amount[3]
  #
  #   4.times do |coin_num|
  #     Balance.create!(user_id: user_num + 1, coin_id: coin_num + 1, amount: total, date: d)
  #   end
  # end
