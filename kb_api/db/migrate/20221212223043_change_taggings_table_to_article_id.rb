class ChangeTaggingsTableToArticleId < ActiveRecord::Migration[7.0]
  def change
    rename_column :taggings, :articles_id, :article_id
    #Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end
