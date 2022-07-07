class OrderNumber < ApplicationRecord
    belongs_to :user
    belongs_to :item

    validates :ordernumber, uniqueness: true
    validates :item_id, uniqueness: true
end
