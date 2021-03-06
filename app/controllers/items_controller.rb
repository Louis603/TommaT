class ItemsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable

  def index
    items = Item.all
    render json: items, status: :ok
  end

  def show
    item = find_item
    render json: item, status: :ok
  end

  def create
    item = Item.create!(item_params)
    render json: item, status: :created
  end


  def update
    item = find_item
    item.update!(item_update_params)
    render json: item, status: :created
  end


  def destroy
    item = find_item
    item.destroy
    head :no_content
  end

  def search_name
    
    # search2 = Item.where("lower(name) LIKE ?", "%#{params_string.downcase}%")
    items = Item.arel_table
    search = Item.where(items[:name].matches("%#{params[:nameSearch]}%"))
    # search3 = Item.items[:name].matches("%pon%")
    render json: search
  end

  private

    def find_item
      Item.find(params[:id])
    end


    def item_params
      params.require(:item).permit(:price, :name, :description, :condition, :user_id, :category_id, :sold, images: [])
      # params.permit(:price, :name, :description, :condition, :user_id, :category_id, :sold, images: [])
    end

    def item_update_params
      params.permit(:price, :name, :description, :sold)
    end

    def unprocessable(object)
      render json: {error: "Condition/Category/Price/Title/Description/Images cannot be blank"  }, status: :unprocessable_entity
    end
end
