class AddIndexes < ActiveRecord::Migration[5.2]
  def change
    add_index :balances, :user_id
    add_index :balances, :coin_id
  end
end
