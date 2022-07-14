class ItemSerializer < ActiveModel::Serializer
  attributes :id, :price, :name, :description, :image, 
    :condition, :user_id, :category_id, :images_urls, :sold,
    :summary, 
    :category, :seller_name

  has_many :tags, serializer: ItemHashtagSerializer
  has_one :review

  def seller_name
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
