class Spot < ActiveRecord::Base

  scope :in_area, ->(x,y) { where("(position_x > ? AND position_x < ?) AND (position_y > ? AND position_y < ?)", x-25, x+25, y-25, y+25) }


  validate :free_area

  def free_area
    if Spot.in_area(position_x, position_y).any?
      errors.add(:area, "this area is occupied")
    end
  end

end
