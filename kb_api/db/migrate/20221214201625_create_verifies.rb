class CreateVerifies < ActiveRecord::Migration[7.0]
  def change
    create_table :verifies do |t|
      t.string :status, :default => 'pending'
      t.references :article, null: false, foreign_key: true

      t.timestamps
    end
  end
end
