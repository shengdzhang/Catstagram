class AllowNullOnCheckedColumnInNotifications < ActiveRecord::Migration
  def change
    change_column_null :notifications, :checked, true
  end
end
