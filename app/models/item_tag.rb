class ItemTag < ApplicationRecord
    belongs_to :item
    belongs_to :tag

    validates :item_id, uniqueness: {scope: :tag_id, message: "already exists"}, presence: true
end
