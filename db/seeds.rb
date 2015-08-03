Spot.destroy_all

$n = 1
$a
$b
while $n < 20

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
		
		if (((Spot.all.map{|old_x| old_x.position_x}.all?{|element| element.between?(x, x+25)})==true and (Spot.all.map{|old_y| old_y.position_y}.all?{|element| element.between?(y-25, y)})==true) || ((Spot.all.map{|old_y| old_y.position_y}.all?{|element| element.between?(y-25, y)})==true and (Spot.all.map{|old_x| old_x.position_x}.all?{|element| element.between?(x, x+25)})==true))
			break
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
end

p "Spots have been created"