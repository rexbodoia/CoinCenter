class Price < ApplicationRecord
  validates :date, :coin_id, :price, presence: true

  belongs_to :coin
end
