class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.float :price
      t.string :name
      t.text :description
      t.string :image
      t.string :condition
      t.integer :user_id
      t.integer :category_id
      t.boolean :sold, default: false

      t.timestamps
    end
  end
end
