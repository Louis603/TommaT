class TagsController < ApplicationController
    def create
        tag = Tag.create!(hashtag:params[:hashtag])
        render json: tag, status: :ok
    end

    def update
        tag = Tag.find(params[:id])
        tag.update!(params[:hashtag])
        render json: tag
    end
end
