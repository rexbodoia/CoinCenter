class ChangeUsersCardColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :card_digest
    add_column :users, :card_digest, :string
  end
end
