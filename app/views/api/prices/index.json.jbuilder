json.array! @prices.each do |price|
  json.extract! price, :id, :date, :coin_id, :price
end
