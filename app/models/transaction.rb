class Transaction < ApplicationRecord
  validates :date, :user_id, :coin_id, :amount, presence: true

  belongs_to :user

  belongs_to :coin
end
