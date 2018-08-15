class ChangeToDatetime < ActiveRecord::Migration[5.2]
  def change
    change_column :balances, :date, :datetime
    change_column :prices, :date, :datetime
    change_column :transactions, :date, :datetime
  end
end
