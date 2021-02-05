module Api::V1

    class CatsController < ApplicationController
    before_action :set_cat, only: [:show, :update, :destroy]

    # GET /cats
    def index
        @cats = Cat.all

        render json: @cats
    end

    # GET /cats/1
    def show
        render json: @cat
    end

    # POST /cats
    def create
        @cat = Cat.new(cat_params)

        if @cat.save
            render json: :show, status: :created 
        else
            render json: @cat.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /cats/1
    def update
        if @cat.update(cat_params)
            render json: @cat
        else
            render json: @cat.errors, status: :unprocessable_entity
        end
    end

    # DELETE /cats/1
    def destroy
        @cat.destroy
    end

    def get_cats
        @user = User.find(params[:id])
        @cats = @user.cats
        render json: @cats
    end

    private
        # Use callbacks to share common setup or constraints between actions.
        def set_cat
            @cat = Cat.find(params[:id])
        end

        # Only allow a trusted parameter "white list" through.
        def cat_params
            params.permit(:name, :birthdate, :breed, :user_id, :image)
        end
    end
end