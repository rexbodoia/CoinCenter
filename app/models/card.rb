class Card < ApplicationRecord
  validates :owner_id, :card_num_digest, presence: true

  belongs_to :owner,
    class_name: :User
end
