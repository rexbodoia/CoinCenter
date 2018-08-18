class DropPrices < ActiveRecord::Migration[5.2]
  def change
    drop_table :prices
  end
end
