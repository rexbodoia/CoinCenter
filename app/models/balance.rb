class Balance < ApplicationRecord
  validates :user_id, :coin_id, :amount, presence: true

  belongs_to :user
  
  belongs_to :coin
end
