require 'csv'

MONTHS = {"Jan" => 1, "Feb" => 2, "Mar" => 3, "Apr" => 4, "May" => 5, "Jun" => 6, "Jul" => 7, "Aug" => 8, "Sep" => 9, "Oct" => 10, "Nov" => 11, "Dec" => 12}

namespace :import do

  desc "Import price data"

  task prices: :environment do
    filename = File.join Rails.root, 'daily_price_data.csv'
    CSV.foreach(filename) do |row|
        d, ethereum, bitcoin_cash, litecoin, b_string, src = row

        bitcoin = [];
        b_string.chars.each do |char|
          next if char == ','
          bitcoin.push(char)
        end
        bitcoin = bitcoin.join('')

        month = MONTHS[d[0..2]]
        day = d[4..5].to_i
        year = d[8..-1].to_i

        date = Date.new(year, month, day)

        row = date, ethereum, bitcoin_cash, litecoin, bitcoin, src

        row.each_index do |idx|
          next if idx == 0 || idx == 5
          row[idx] = 0 if row[idx] == nil
          Price.create(date: date, coin_id: idx, price: row[idx])
        end
    end
  end
end
