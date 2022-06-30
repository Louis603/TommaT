class User < ApplicationRecord
    has_secure_password

    has_many :items
    has_many :reviews
    has_many :likes
    has_many :order_numbers
    has_one :cart
    
    # validates :password, length: { minimum: 3 }, allow_nil: true
end
