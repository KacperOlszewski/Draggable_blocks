class Spot < ActiveRecord::Base

  scope :in_area, ->(x,y) { where("(position_x > ? AND position_x < ?) OR (position_y > ? AND position_y < ?)", x, x+24, y, y+24) }

  validate :free_area

   def free_area
    if Spot.in_area(position_x, position_y)
      errors.add(:area, "this area is not free")
    end
  end
end
