class Item < ApplicationRecord
    belongs_to :user
    belongs_to :category
    has_many :item_tags, dependent: :destroy
    has_many :tags, through: :item_tags
    has_many :carts
    has_many :likes
    has_one :order_number

    validates :user_id, presence: true
    validates :category_id, presence: true
    validates :image, presence: true
end
