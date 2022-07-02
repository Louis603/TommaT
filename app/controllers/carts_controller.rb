class CartsController < ApplicationController

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
end
