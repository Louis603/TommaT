class CreateAddBuyerToReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :add_buyer_to_reviews do |t|
      add_column :reviews, :buyer_id, :integer
      t.timestamps
    end
  end
end
