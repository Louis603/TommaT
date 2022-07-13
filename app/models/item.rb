class Item < ApplicationRecord
    belongs_to :user
    belongs_to :category
    has_many :item_tags, dependent: :destroy
    has_many :tags, through: :item_tags
    has_many :carts
    has_many :likes
    has_one :order_number
    has_one :review

    has_many_attached :images

    def images_urls
        images.map{|i| Rails.application.routes.url_helpers.url_for(i) }
    end

    # has_one_attached :avatar

    # def resume_url
    #     if avatar.attached?
    #       avatar.blob.service_url
    #     end
    # end

    validates :user_id, presence: true
    validates :category_id, presence: true
    # validates :image, presence: true
end
