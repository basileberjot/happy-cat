module Api::V1

    class WeightsController < ApplicationController
    before_action :set_weight, only: [:show, :update, :destroy]

    # GET /weights
    def index
        @weights = Weight.all

        render json: @weights
    end

    # GET /weights/1
    def show
        render json: @weight
    end

    # POST /weights
    def create
        @weight = Weight.new(weight_params)

        if @weight.save
            render json: :show, status: :created 
        else
            render json: @weight.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /weights/1
    def update
        # @weight = Weight.find_by(params[:id])
        # @weight.update(weight_params)
        if @weight.update(weight_params)
            render json: @weight
        else
            render json: @weight.errors, status: :unprocessable_entity
        end
    end

    # DELETE /weights/1
    def destroy
        @weight.destroy
    end

    def get_weights
        @cat = Cat.find(params[:id])
        @weights = @cat.weights
        render json: @weights
    end

    # def get_weights
    #     @user = User.find(params[:id])
    #     @weights = @user.weights
    #     render json: @weights
    # end

    private
        # Use callbacks to share common setup or constraints between actions.
        def set_weight
            @weight = Weight.find(params[:id])
        end

        # Only allow a trusted parameter "white list" through.
        def weight_params
            params.require(:weight).permit(:value, :cat_id)
        end
    end
end