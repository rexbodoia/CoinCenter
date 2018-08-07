class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.integer :owner_id, null: false
      t.string :card_num_digest, null: false
      t.timestamps
    end

    add_index :cards, :owner_id
  end
end
