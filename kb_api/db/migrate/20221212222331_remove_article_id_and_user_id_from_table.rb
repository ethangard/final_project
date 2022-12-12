class RemoveArticleIdAndUserIdFromTable < ActiveRecord::Migration[7.0]
  def change
    remove_column :tags, :article_id, :user_id
  end
end
