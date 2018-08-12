# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_12_050430) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "balances", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "coin_id", null: false
    t.float "amount", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coin_id"], name: "index_balances_on_coin_id"
    t.index ["user_id"], name: "index_balances_on_user_id"
  end

  create_table "cards", force: :cascade do |t|
    t.integer "owner_id", null: false
    t.string "card_num_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_cards_on_owner_id"
  end

  create_table "coins", force: :cascade do |t|
    t.string "name", null: false
    t.string "ticker_symbol", null: false
    t.float "current_price", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "prices", force: :cascade do |t|
    t.date "date", null: false
    t.integer "coin_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "price"
    t.index ["coin_id"], name: "index_prices_on_coin_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.datetime "date", null: false
    t.integer "user_id", null: false
    t.integer "coin_id", null: false
    t.float "amount", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coin_id"], name: "index_transactions_on_coin_id"
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "f_name", null: false
    t.string "l_name", null: false
    t.string "email", null: false
    t.string "image_url"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "phone_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "card_digest"
    t.index ["card_digest"], name: "index_users_on_card_digest"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["phone_number"], name: "index_users_on_phone_number", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
