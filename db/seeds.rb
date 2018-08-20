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

amount_gen = Random.new;

30.times do |user_num|
  User.create(f_name: 'guest', l_name: 'user', email: "guest#{user_num}@user.com", password: '12345678')

  prob_gen = Random.new
  match_gen = Random.new

  marker = prob_gen.rand(12)
  today = Date.new(2018,8,17)

  (0..300).each do |days_back|
    if match_gen.rand(12) == marker
      new_date = (today - days_back).to_datetime
      coin_id = prob_gen.rand(4) + 1
      if(coin_id == 4)
        Transaction.create!(date: new_date, coin_id: coin_id, user_id: user_num + 1, amount: amount_gen.rand(1.0))
      else
        Transaction.create!(date: new_date, coin_id: coin_id, user_id: user_num + 1, amount: amount_gen.rand(6.0))
      end
    end
  end
end

# times_gen.rand(120).times do |time|
#   Transaction.create!(date: DateTime.new([2018, 2017, 2016].sample, date_gen.rand(1..12), date_gen.rand(1..28)), coin_id: times_gen.rand(4) + 1, user_id: user_num + 1, amount: amount_gen.rand(5.0))
# end
