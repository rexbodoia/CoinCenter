class AddIndexToCards < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :card_digest
  end
end
