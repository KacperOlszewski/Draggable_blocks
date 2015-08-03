class CreateSpots < ActiveRecord::Migration
  def change
    create_table :spots do |t|
      t.string :name
      t.integer :position_x
      t.integer :position_y

      t.timestamps null: false
    end
  end
end
