class CreateFavouritesLinks < ActiveRecord::Migration[7.0]
  def change
    create_table :favourites_links do |t|
      t.references :article, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
