class ItemTagsController < ApplicationController

    def index 
        item_tags = ItemTag.all
        render json: item_tags, status: :ok
    end
    
    def create
        item_tag = ItemTag.create!(item_tag_params)
        render json: item_tag, status: :created
    end

    private

    def item_tag_params
        params.permit(:item_id, :tag_id)
    end
end
