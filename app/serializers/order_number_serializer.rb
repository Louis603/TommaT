class OrderNumberSerializer < ActiveModel::Serializer
  attributes :id, :ordernumber, :user_id, :item_id
end
