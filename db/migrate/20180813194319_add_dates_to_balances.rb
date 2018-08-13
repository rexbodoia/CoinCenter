class AddDatesToBalances < ActiveRecord::Migration[5.2]
  def change
    add_column :balances, :date, :date
    add_index :balances, :date
  end
end
