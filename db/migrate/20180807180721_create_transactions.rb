class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.datetime :date, null: false
      t.integer :user_id, null: false
      t.integer :coin_id, null: false
      t.float :amount, null: false
      t.timestamps
    end

    add_index :transactions, :user_id
    add_index :transactions, :coin_id
  end
end
