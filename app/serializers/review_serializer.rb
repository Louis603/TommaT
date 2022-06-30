class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :score, :comment
end
