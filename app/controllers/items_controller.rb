class ItemsController < ApplicationController

  def index
    items = Item.all
    render json: items, status: :ok
  end

  def show
    item = find_item
    render json: item, status: :ok
  end

  def create
    byebug
    item = Item.create(item_params)
    render json: item, status: :created
  end


  def update
    item = find_item
    item.update!(item_params)
    render json: item, status: :created
  end


  def destroy
    item = find_item
    item.destroy
    head :no_content
  end

  private

    def find_item
      Item.find(params[:id])
    end


    def item_params
      params.permit(:price, :name, :description, :image, :condition, :user_id, :category_id, :sold)
    end
end
