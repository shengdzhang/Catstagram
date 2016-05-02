class CreateMedia < ActiveRecord::Migration
  def change
    create_table :media do |t|
      t.string :title, null: false
      t.text :description
      t.integer :user_id, null: false
      t.string :media_url, null: false

      t.timestamps null: false
    end
    add_index :media, :user_id
  end
end
