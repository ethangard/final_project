class RemoveDefaultTrueFromArticlePublished < ActiveRecord::Migration[7.0]
  def change
    change_column :articles, :published, :boolean
  end
end
