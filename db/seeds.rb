Spot.destroy_all

while Spot.count < 30

	x = rand(100..900)
	y = rand(100..900)

	Spot.create(
		name: "block_"+SecureRandom.random_number(20).to_s,
		position_x: x,
		position_y: y
	)

end

p "Spots have been created"