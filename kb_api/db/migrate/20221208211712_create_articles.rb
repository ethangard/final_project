class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :body
      t.string :collection
        t.text :tags, array: true, default: []

      t.timestamps
    end
    add_index :articles, :title
  end
end
