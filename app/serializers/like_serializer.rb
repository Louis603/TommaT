class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :item_id

  has_many :item
end
