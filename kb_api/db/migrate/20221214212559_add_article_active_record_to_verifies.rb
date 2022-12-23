class AddArticleActiveRecordToVerifies < ActiveRecord::Migration[7.0]
  def change
    add_column :verifies, :past_verfications, :text, default: ""
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
