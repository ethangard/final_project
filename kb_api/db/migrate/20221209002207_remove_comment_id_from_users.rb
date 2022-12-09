class RemoveCommentIdFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :comment_id, :bigint
  end
end
