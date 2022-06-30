class UsersController < ApplicationController
    def show
        user = User.find(session[:user_id])
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


    private

    def user_params
        params.permit(:username, :password)
    end
end
