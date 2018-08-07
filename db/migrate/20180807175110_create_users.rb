class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null: false, unique: true
      t.string :f_name, null: false
      t.string :l_name, null: false
      t.string :email, null: false, unique: true
      t.string :image_url
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :phone_number, unique: true
      t.string :card_digest, null: false
      t.timestamps
    end

    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
    add_index :users, :phone_number, unique: true
    add_index :users, :card_digest, unique: true
  end
end
