class ItemSerializer < ActiveModel::Serializer
  attributes :id, :price, :name, :description, :image, :condition, :user_id, :category_id, :sold
end
