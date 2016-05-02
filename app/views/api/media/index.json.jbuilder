json.array!(@media) do |medium|
  json.partial!('medium', medium: medium)
end
