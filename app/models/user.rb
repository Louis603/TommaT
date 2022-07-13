class User < ApplicationRecord
    has_secure_password

    has_one_attached :avatar

    def avatar_url
        Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
    end

    has_many :items
    has_many :reviews
    has_many :likes
    has_many :order_numbers
    has_one :cart
    
    # validates :password, length: { minimum: 3 }, allow_nil: true
    validates :username, uniqueness: true
end
