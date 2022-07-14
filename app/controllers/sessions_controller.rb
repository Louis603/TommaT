class SessionsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    
    
    def login
        user = User.find_by!(username:params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { error: "invalid username or password" }, status: :unauthorized
        end
    end

    def logout
        session.delete :user_id
        head :no_content
    end

    private

    def not_found
        render json: { error: "Invalid username or password"}, status: :not_found
    end
end
