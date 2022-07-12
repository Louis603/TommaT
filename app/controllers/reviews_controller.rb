class ReviewsController < ApplicationController

    def index
        reviews = Review.all
        render json: reviews, status: :ok
    end

    def show
        review = find_review
        render json: review, status: :ok
    end

    def create
        review = Review.create!(review_params) 
        render json: review, status: :ok
    end


    private

    def find_review
        Review.find(params[:id])
    end

    def review_params
        params.permit(:user_id, :item_id, :score, :comment, :buyer_id)
    end
end
