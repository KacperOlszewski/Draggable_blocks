class PublicController < ApplicationController
  def index
  	@spots = Spot.all
  	@newSpot = Spot.new
  end
end
