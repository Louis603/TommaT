class Like < ApplicationRecord
    belongs_to :user
    belongs_to :item

    validates :user_id, presence: true
    validates :item_id, presence: true, uniqueness: {scope: :user_id}
end
