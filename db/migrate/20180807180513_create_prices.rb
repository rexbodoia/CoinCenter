class CreatePrices < ActiveRecord::Migration[5.2]
  def change
    create_table :prices do |t|
      t.datetime :date, null: false
      t.integer :coin_id, null: false
      t.float :price, null: false
      t.timestamps
    end

    add_index :prices, :coin_id
  end
end
