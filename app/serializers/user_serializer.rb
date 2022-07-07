class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :average_score

  has_many :items
  has_many :reviews
  has_many :likes
  has_many :order_numbers
  has_one :cart

  def average_score
    rating = 0
    ratingMap = self.object.reviews.map { |review| rating = review.score + rating}
    "#{rating}"
    # self.object.username
  end
end
