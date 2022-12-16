class ChangeArticleCollectionColumnToHash < ActiveRecord::Migration[7.0]
  def change
    change_column :articles, :collection, :text
    #Ex:- change_column("admin_users", "email", :string, :limit =>25)
  end
end
