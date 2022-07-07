class ItemSerializer < ActiveModel::Serializer
  attributes :id, :price, :name, :description, :image, 
    :condition, :user_id, :category_id, :sold, :summary, :category, :seller

  has_many :tags, serializer: ItemHashtagSerializer

  def seller
    self.object.user.username
  end

  def category
    self.object.category.name
  end

  def summary
    # byebug
      "#{self.object.description[0..15]}..."
  end
end
