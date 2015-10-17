class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :post_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :favorites, :post_id
    add_index :favorites, :user_id
    add_index :favorites, [:post_id, :user_id], unique: true
  end
end
