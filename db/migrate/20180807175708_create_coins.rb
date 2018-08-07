class CreateCoins < ActiveRecord::Migration[5.2]
  def change
    create_table :coins do |t|
      t.string :name, null: false, unique: true
      t.string :ticker_symbol, null: false, unique: true
      t.float :current_price, null: false
      t.timestamps
    end
  end
end
