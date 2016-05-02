json.array!(@users) do |user|
  json.extract! user, :id, :displayname
end
