class CreateOrderNumbers < ActiveRecord::Migration[7.0]
  def change
    create_table :order_numbers do |t|
      t.integer :ordernumber
      t.integer :user_id
      t.integer :item_id

      t.timestamps
    end
  end
end
