class DropBalances < ActiveRecord::Migration[5.2]
  def change
    drop_table :balances
  end
end
