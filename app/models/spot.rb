class Spot < ActiveRecord::Base

	#validates_uniqueness_of :position_x, unless: Spot.new { |user| user.signup_step <= 2 })


end
