class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :items
  has_many :reviews
  has_many :likes
  has_many :order_numbers
  has_one :cart
end
