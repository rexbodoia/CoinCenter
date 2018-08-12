class ChangePriceValidation < ActiveRecord::Migration[5.2]
  def change
    remove_column :prices, :price
    add_column :prices, :price, :float
    change_column :prices, :date, :date
  end
end
