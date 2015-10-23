class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.integer :user_id, null: false
      t.string :message, null: false
      t.string :href, null: false
      t.boolean :checked, null: false, default: false

      t.timestamps null: false
    end
    add_index :notifications, :user_id
  end
end
