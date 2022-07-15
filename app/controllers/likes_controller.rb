class LikesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid

    before_action :authorize


    def show
        like = Like.where(user_id:params[:id])
        render json: like, status: :ok
    end

    def create
        like = Like.create!(like_param)
        render json: like, status: :created
    end

    def destroy
        like = Like.find(params[:id])
        like.destroy
        head :no_content
    end

    private

    def like_param
        params.permit(:user_id, :item_id)
    end

    def invalid
        render json: { error: "Item Is Already In Wishlist" }, status: :unprocessable_entity
    end

    def authorize
        render json: {error: "Please sign in to add to wishlist" }, status: :unauthorized unless session.include? :user_id
    end
end
