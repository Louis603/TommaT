class UsersController < ApplicationController
    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: { error: "not singed in" }, status: :unauthorized
        end
    end

    def index
        user = User.all
        render json: user, status: :ok
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def profile
        user = User.find(params[:id])
        render json: user, status: :ok
    end


    private

    def user_params
        params.permit(:username, :password)
    end
end
