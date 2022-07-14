class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :average_score, :sold_count, :sold_money, :review_count, :latest_review, :avatar_url

  has_many :items
  has_many :reviews
  has_many :likes
  has_many :order_numbers
  has_one :cart

  def average_score
    if(self.object.reviews.count > 0)
      rating_sum = self.object.reviews.pluck(:score).sum
      count = self.object.reviews.count
      score = rating_sum/count
      "#{score.to_f}"
    else
      0
    end
  end

  def sold_count
    self.object.items.filter {|i| i.sold}.count
  end
  
  def sold_money
    self.object.items.filter {|i| i.sold}.pluck(:price).sum.to_i
  end

  def review_count
    self.object.reviews.count
  end

  def latest_review
    if(self.object.reviews.last)
      buyer = self.object.reviews.last.buyer.username
      review = self.object.reviews.last.comment
    "#{buyer} - \"#{review}\""
    else
      nil
    end
  end
end
