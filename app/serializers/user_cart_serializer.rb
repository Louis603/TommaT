class UserCartSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :item_id, :items

  # def item_info
  #   self.object.item.name
  # end
end
