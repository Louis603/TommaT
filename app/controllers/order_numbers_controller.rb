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
        order = OrderNumber.create!(order_params)
        render json: order, status: :created
    end

    def destroy
        order = OrderNumber.find(params[:id])
        order.destroy
        head :no_content
    end

    private

    def order_params
        params.permit(:ordernumber, :user_id, :item_id)
    end
end
