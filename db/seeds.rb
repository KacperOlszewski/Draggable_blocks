Spot.destroy_all

$n = 1
$a
$b
while $n < 6

	x = rand(100..900)
	y = rand(100..900)


	if $n == 1
		Spot.create(
			name: "block_"+SecureRandom.random_number(20).to_s,
			position_x: x,
			position_y: y
		)
		$n +=1
		$a = x
		$b = y
	else

			Spot.create(
				name: "block_"+SecureRandom.random_number(20).to_s,
				position_x: x,
				position_y: y
			)
			
			$n +=1
			$a = x
			$b = y

	end
end

p "Spots have been created"