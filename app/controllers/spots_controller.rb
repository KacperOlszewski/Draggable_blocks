class SpotsController < ApplicationController
  before_action :set_spot, only: [:show, :edit, :update, :destroy]

  # GET /spot
  # GET /spots.json
  def index
     @spots = Spot.all
     @spot = Spot.new
  end

  # GET /spots/1
  # GET /spots/1.json
  def show
  end

  # GET /spots/new
  def new
    @spot = Spot.new
  end

  # GET /spots/1/edit
  def edit
  end

  # POST /spots
  # POST /spots.json
  def create
    @spot = Spot.new(spot_params)
    #binding.pry
    respond_to do |format|
      if @spot.save
        format.js
      else
        format.js { render js: @spot.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /spots/1
  # PATCH/PUT /spots/1.json
  def update
    respond_to do |format|
      if @spot.update(spot_params)
        format.js {render layout: false}
      else
        format.js { render json: @spot.errors, status: :unprocessable_entity,  notice: 'Spot was not updated.' }
      end
    end
  end

  # DELETE /spots/1
  # DELETE /spots/1.json
  def destroy
    @spot.destroy
    render json: @spot.errors
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_spot
      @spot = Spot.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def spot_params
      params.require(:spot).permit(:name, :position_x, :position_y)
    end
end
