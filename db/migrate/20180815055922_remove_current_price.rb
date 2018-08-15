class RemoveCurrentPrice < ActiveRecord::Migration[5.2]
  def change
    remove_column :coins, :current_price
  end
end
