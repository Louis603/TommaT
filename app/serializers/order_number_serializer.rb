class OrderNumberSerializer < ActiveModel::Serializer
  attributes :id, :ordernumber, :user_id, :item_id, :item_details

  def item_details
    self.object.item
  end
end
