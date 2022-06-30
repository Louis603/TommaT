class ItemTagsController < ApplicationController
    def create
        item_tag = ItemTag.create!(item_tag_params)
    end

    private

    def item_tag_params
        params.permit(:item_id, :tag_id)
    end
end
