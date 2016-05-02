class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :displayname
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :profile_pic_url
      t.text :description

      t.timestamps null: false
    end

    add_index :users, :session_token, unique: true
    add_index :users, :username, unique: true
  end
end
