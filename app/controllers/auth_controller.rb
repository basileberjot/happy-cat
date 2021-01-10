class AuthController < ApplicationController
    # before_action :require_login

    def logged_in?
        !!session_user
    end

    def require_login
        render json: {message: 'Please login'}, status: :unauthorized unless logged_in?
    end

    def login
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            payload = {user_id: user.id}
            token = encode_token(payload)
            render json: {user: user, jwt: token, success: "Welcome back, #{user.email}"}
        else
            render json: {err: "Log in failed. Email or password invalid"}
        end
    end

    def auto_login 
        if session_user
            render json: session_user
        else
            render json: {errors: "No User logged in"}
        end
    end
end
