class OrderNumbersController < ApplicationController
    def index
        order = OrderNumber.all
        render json: order, status: :ok
    end

    def show 
        order = OrderNumber.find(params[:id])
        render json: order, status: :ok
    end

    def create
        random = rand(1000..9999)
        if (OrderNumber.find_by(ordernumber: random))
            random = rand(1000..9999)
            order = OrderNumber.create!(ordernumber: random, user_id: params[:user_id], item_id: params[:item_id])
            render json: order, status: :created
        else
            order = OrderNumber.create!(ordernumber: random, user_id: params[:user_id], item_id: params[:item_id])
            render json: order, status: :created

        end
        
    end

    def destroy
        order = OrderNumber.find(params[:id])
        order.destroy
        head :no_content
    end

    def empty_cart
        cart = Cart.where(user_id: params[:id])
        cart.destroy_all
        head :no_content
    end

    private

    def order_params
        params.permit(:ordernumber, :user_id, :item_id)
    end
end
