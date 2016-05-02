class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :medium_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :likes, :medium_id
    add_index :likes, :user_id
    add_index :likes, [:medium_id, :user_id], unique: true
  end
end
