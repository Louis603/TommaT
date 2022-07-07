class Tag < ApplicationRecord
    has_many :item_tags
    has_many :items, through: :item_tags

    validates :hashtag, uniqueness: true, format: { with: /\A[a-z0-9]+\z/ }, presence: true

    def items
        byebug
    end
end
