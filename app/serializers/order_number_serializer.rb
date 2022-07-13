class OrderNumberSerializer < ActiveModel::Serializer
  attributes :id, :ordernumber, :user_id, :item_id, :item_details, :images_urls

  def item_details
    self.object.item
  end

  def images_urls
    self.object.item.images_urls[0]
  end
end
