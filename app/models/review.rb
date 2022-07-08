class Review < ApplicationRecord
    belongs_to :user
    belongs_to :item
    belongs_to :buyer, class_name: 'User'

    validates :item_id, uniqueness: true
end
