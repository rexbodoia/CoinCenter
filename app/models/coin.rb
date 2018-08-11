class Coin < ApplicationRecord
  validates :name, :ticker_symbol, :current_price, presence: true

  has_many :transactions

  has_many :balances

  has_many :prices
end
