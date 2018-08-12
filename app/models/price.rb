class Price < ApplicationRecord
  validates :date, :coin_id, presence: true

  belongs_to :coin

  # require 'csv'
  #
  # def self.import(file)
  #   CSV.foreach(file.path, headers: true) do |row|
  #     User.create(row)
  #   end
  # end
end
