json.array!(@spots) do |spot|
  json.extract! spot, :id, :name, :position_x, :position_y
  json.url spot_url(spot, format: :json)
end
