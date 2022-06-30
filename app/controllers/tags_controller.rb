class TagsController < ApplicationController

    def index 
        tags = Tag.all
        render json: tag, status: :ok
    end

    def create
        tag = Tag.create!(hashtag:params[:hashtag])
        render json: tag, status: :ok
    end

    def update
        tag = find_tag
        tag.update!(params[:hashtag])
        render json: tag, status: :created
    end

    def destroy
        tag = find_tag
        tag.destroy
        head :no_content
    end

    private

    def find_tag
        Tag.find(params[:id])
    end
end
