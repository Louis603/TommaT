class CategoriesController < ApplicationController

  def index
    categories = Category.all
    render json: categories, status: :ok
  end

  def category_items
    category = Category.find(params[:category_id])
    render json: category.items
  end

end 
