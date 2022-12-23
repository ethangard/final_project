class AddPermissionLevelToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :permission_level, :string, default: 'read'
  end
end
