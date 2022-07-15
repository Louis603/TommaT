class CartsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid

    before_action :authorize
    # skip_before_action :authorize, only: [:show]

    def show
        cart = Cart.where(user_id:params[:id])
        render json: cart, status: :ok
    end

    def create
        cart = Cart.create!(cart_params)
        render json: cart, status: :created
    end

    def update
        cart = find_cart
        cart.update!(cart_params)
        render json: cart, status: :created
    end

    def destroy 
        cart = find_cart
        cart.destroy
        head :no_content
    end

    private

    def cart_params
        params.permit(:user_id, :item_id)
    end

    def find_cart
        Cart.find(params[:id])
    end

    def invalid
        render json: { error: "Item Is Already In Cart" }, status: :unprocessable_entity
    end

    def authorize
        render json: {error: "Please sign in to add add to cart" }, status: :unauthorized unless session.include? :user_id
    end
end
